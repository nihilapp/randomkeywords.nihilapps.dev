import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { User } from '@/_prisma/client';
import {
  CreateToken, TokenInfo, TokenMode
} from '@/_types';
import { serverTools } from '.';
import { DB } from '@/_libs';

export class Jwt {
  // 시크릿 키 설정
  private setSecret(mode: TokenMode) {
    const secret = mode === 'accessToken'
      ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
      : process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET;

    return secret;
  }

  // 만료 시간 설정
  private setExpTime(mode: TokenMode) {
    const expTime = mode === 'accessToken'
      ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE_TIME
      : process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRE_TIME;

    return expTime;
  }

  // 쿠키 찾아서 반환
  private async findCookieValue(key: string) {
    const store = await cookies();

    const value = store.get(key)?.value;

    return value;
  }

  // 쿠키에 값 저장
  public async setCookieValue(
    key: ('session' | 'isSignedIn' | 'cuid'),
    value: string,
    maxAge: number
  ) {
    const store = await cookies();

    let maxAgeValue: number | string;

    if (!maxAge) {
      maxAgeValue = 60 * 60 * 24 * 365;
    } else {
      maxAgeValue = maxAge;
    }

    store.set(key, value, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: maxAgeValue,
    });
  }

  // 토큰 생성
  public async genToken(
    mode: TokenMode,
    user: User
  ) {
    const {
      id, email, name, role,
    } = user;

    const secret = new TextEncoder()
      .encode(this.setSecret(mode));

    const token = await new SignJWT({
      id, email, name, role,
    })
      .setProtectedHeader({ alg: 'HS256', })
      .setExpirationTime(this.setExpTime(mode))
      .sign(secret);

    const info = await this.tokenInfo(mode, token);

    return {
      token,
      exp: info.exp,
    };
  }

  // 토큰 정보 조회
  public async tokenInfo(
    mode: TokenMode,
    token: string
  ) {
    const secret = new TextEncoder()
      .encode(this.setSecret(mode));

    const { payload, } = await jwtVerify(token, secret, {
      algorithms: [ 'HS256', ],
    });

    return payload as unknown as TokenInfo;
  }

  // 만료 시간 체크
  public expCheck(tokenInfo: TokenInfo) {
    const now = Math.floor(Date.now() / 1000);
    const diff = Math.floor(tokenInfo.exp) - now;

    return diff;
  }

  // 토큰 상태 체크
  public async tokenStatus(
    mode: TokenMode,
    token: string
  ) {
    const tokenInfo = await this.tokenInfo(
      mode,
      token
    );

    const diff = this.expCheck(tokenInfo);

    return !(diff < 180);
  }

  // ID로 유저 조회
  public async findUserById(id: string) {
    const user = await DB.users().findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  // 쿠키의 토큰과 DB의 토큰을 비교
  public async compareToken(id: string) {
    const tokenCookieString = await this
      .findCookieValue('session');

    const tokenCookie = serverTools
      .common
      .parse<CreateToken>(tokenCookieString);

    const user = await this.findUserById(id);

    return user.accessToken === tokenCookie.token;
  }

  // 유저 토큰 가져오기
  static async getTokens(user: User) {
    const { refreshToken, } = await DB.refreshTokens().findFirst({
      where: {
        userId: user.id,
      },
    });

    return { accessToken: user.accessToken, refreshToken, };
  }

  // 유저 토큰 업데이트
  public async updateUserToken(
    mode: ('signin' | 'tokenRefresh'),
    id: string,
    token: string,
    exp: number
  ) {
    if (mode === 'signin') {
      return DB.users().update({
        where: { id, },
        data: {
          accessToken: token,
          exp,
          lastSignIn: serverTools.calendar.UTCString(),
        },
      });
    } else {
      return DB.users().update({
        where: { id, },
        data: {
          accessToken: token,
          exp,
        },
      });
    }
  }

  public async getSignInStatus() {
    const cookieStore = await cookies();

    const isSignedIn = cookieStore
      .get('isSignedIn')?.value;
    const session = cookieStore
      .get('session')?.value;
    const cuid = cookieStore
      .get('cuid')?.value;

    return { isSignedIn, session, cuid, };
  }

  // 토큰 재발급 로직
  public async tokenRefresh(user: User) {
    const {
      isSignedIn,
      session,
      cuid,
    } = await this.getSignInStatus();

    // 1. 로그인 상태가 아니고 세션 쿠키도 없는 경우
    if (((isSignedIn === 'N') || !isSignedIn) && !session) {
      return {
        type: 'error',
        resData: null,
        message: '로그인 되어있지 않습니다.',
        status: 'Unauthorized',
      };
    }

    // 2. ID로 사용자 정보 조회
    const userInfo = await this.findUserById(user.id);

    const sessionTokenInfo = await this.tokenInfo(
      'accessToken',
      serverTools.common.parse<CreateToken>(session).token
    );

    if (sessionTokenInfo.id !== userInfo.id) {
      return {
        type: 'error',
        resData: null,
        message: '접근 권한이 없습니다.',
        status: 'Forbidden',
      };
    }

    if (!userInfo) {
      return {
        type: 'error',
        resData: null,
        message: '사용자를 찾을 수 없습니다.',
        status: 'Unauthorized',
      };
    }

    // 3. 로그인 상태이지만 세션 쿠키가 없는 경우 (토큰 만료 가능성)
    if (isSignedIn === 'Y' && !session) {
      const newAccessToken = await this.genToken(
        'accessToken',
        user
      );
      const newAccessTokenInfo = await this.tokenInfo(
        'accessToken',
        newAccessToken.token
      );

      this.setCookieValue(
        'session',
        serverTools.common.string({
          token: newAccessToken.token,
          exp: newAccessTokenInfo.exp,
        }),
        newAccessTokenInfo.exp
      );
    }

    // 4. 액세스 토큰과 리프레시 토큰 상태 확인
    const { accessToken, refreshToken, } = await Jwt.getTokens(userInfo);
    const accessTokenStatus = await this.tokenStatus(
      'accessToken',
      accessToken
    );
    const refreshTokenStatus = await this.tokenStatus(
      'refreshToken',
      refreshToken
    );

    // 4.1. 액세스 토큰이 만료된 경우
    if (!accessTokenStatus) {
      // 4.2. 리프레시 토큰도 만료된 경우
      if (!refreshTokenStatus) {
        await this.clearCookie();

        return {
          type: 'error',
          resData: null,
          message: '리프레시 토큰이 만료되었습니다. 다시 로그인 해주세요.',
          status: 'Unauthorized',
        };
      }

      // 4.3. 리프레시 토큰이 유효한 경우, 새 액세스 토큰 발급
      const newAccessToken = await this.genToken('accessToken', userInfo);

      const updatedUser = await this.updateUserToken(
        'tokenRefresh',
        userInfo.id,
        newAccessToken.token,
        newAccessToken.exp
      );

      await this.setCookieValue(
        'session',
        serverTools.common.string({
          token: newAccessToken.token,
          exp: newAccessToken.exp,
        }),
        newAccessToken.exp
      );

      await this.setCookieValue(
        'isSignedIn',
        'Y',
        newAccessToken.exp
      );

      await this.setCookieValue(
        'cuid',
        cuid,
        newAccessToken.exp
      );

      return {
        type: 'success',
        resData: updatedUser,
        message: '새로운 액세스 토큰이 발급되었습니다.',
        status: 'OK',
      };
    }

    // 5. 토큰이 유효한 경우 유저 정보 반환
    return {
      type: 'success',
      resData: userInfo,
      message: '토큰이 유효합니다.',
      status: 'OK',
    };
  }

  // 모든 쿠키 삭제
  public async clearCookie() {
    await this.setCookieValue(
      'isSignedIn',
      'N',
      0
    );
    await this.setCookieValue(
      'session',
      '',
      0
    );
  }
}
