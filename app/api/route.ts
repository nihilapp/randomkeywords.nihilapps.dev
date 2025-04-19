import { NextResponse, type NextRequest } from 'next/server';
import path from 'path';
import fs, { unlink } from 'fs/promises';
import { DB } from '@/api/_libs';

function genDateString() {
  // 2025-04-17 과 같은 형식으로 만들어져야 함.
  const date = new Date();
  const year = date.getFullYear();
  // 월과 일이 한 자리 수일 경우 앞에 0을 붙여 두 자리로 만듦
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function GET(req: NextRequest) {
  const { searchParams, } = req.nextUrl;
  const forceCreate = searchParams.get('forceCreate');

  const categoryNames = [ '캐릭터 관련', '배경스토리 관련', '기타', ];
  const todayDateString = genDateString(); // 오늘 날짜 문자열 미리 생성
  const jsonDir = path.join(process.cwd(), 'json');

  // 날짜 파일을 확인하고 이전 파일을 정리하는 로직
  try {
    const files = await fs.readdir(jsonDir);
    let todayFileExists = false;

    // 파일 목록을 병렬로 처리하여 확인 및 삭제
    await Promise.all(files.map(async (filename) => {
      const filePath = path.join(jsonDir, filename);
      // YYYY-MM-DD.txt 형식의 파일인지 확인
      if (/^\d{4}-\d{2}-\d{2}\.txt$/.test(filename)) {
        if (filename === `${todayDateString}.txt`) {
          // 오늘 날짜 파일 발견
          todayFileExists = true;
        } else {
          // 이전 날짜 파일 삭제
          try {
            await unlink(filePath);
            console.log(`이전 날짜 파일 삭제: ${filename}`);
          } catch (deleteError) {
            // 삭제 중 오류 발생 시 로깅 (실행은 계속)
            console.error(`이전 날짜 파일 삭제 실패 (${filename}):`, deleteError);
          }
        }
      }
    }));

    // 오늘 날짜 파일이 이미 존재하면 작업 중단
    if (todayFileExists && forceCreate !== 'true') {
      console.log(`오늘 (${todayDateString})의 데이터는 이미 생성되어 있습니다.`);
      // 상태 코드와 메시지 반환
      return NextResponse.json({ message: `오늘 (${todayDateString}) 데이터가 이미 생성되었습니다.`, }, { status: 200, });
    }
  } catch (error) {
    // 디렉토리가 없는 경우(ENOENT)는 오류가 아님 (처음 실행 시)
    if (error.code !== 'ENOENT') {
      console.error('날짜 파일 확인/정리 중 오류 발생:', error);
      // 예상치 못한 오류 발생 시 서버 오류 응답
      return NextResponse.json({ message: '서버 오류: 날짜 파일 확인 중 문제 발생', }, { status: 500, });
    }
    // json 디렉토리가 없으면 그냥 진행 (생성될 예정)
    console.log('json 디렉토리가 없어 새로 생성합니다.');
  }

  if (process.env.NODE_ENV === 'development') {
    // categoryNames.forEach 비동기 처리 수정 (Promise.all 사용 권장)
    await Promise.all(categoryNames.map(async (category) => { // map과 Promise.all로 병렬 처리
      const categoryData = await DB.categories().findFirst({
        where: {
          name: category,
        },
        select: {
          id: true,
        },
      });

      if (!categoryData) {
        // 특정 카테고리 못찾았을 때 에러 대신 로깅 후 건너뛰기 고려
        console.error(`카테고리를 찾을 수 없습니다.: ${category}`);
        return; // 이 카테고리 처리 중단
        // throw new Error(`카테고리를 찾을 수 없습니다.: ${category}`); // 전체 중단이 필요하면 사용
      }

      const subCategories = await DB.subCategories().findMany({
        where: {
          category_id: categoryData.id,
        },
        select: {
          id: true,
          name: true,
        },
      });

      const jsonData = {};

      const keywordPromises = subCategories.map((subCategory) => DB.keywords().findMany({
        where: { sub_category_id: subCategory.id, },
        select: { keyword: true, },
      }));

      const results = await Promise.all(keywordPromises);

      subCategories.forEach((subCategory, index) => {
        jsonData[subCategory.name] = results[index].map((k) => k.keyword);
      });

      const filePath = path.join(jsonDir, `${category}.json`); // jsonDir 변수 사용
      // writeFile import 확인됨
      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    })); // categoryNames.map 끝

    // 모든 카테고리 처리 후 오늘 날짜 파일 생성
    const dateFilePath = path.join(jsonDir, `${todayDateString}.txt`); // jsonDir, todayDateString 변수 사용
    // 파일 내용으로 오늘 날짜 문자열 저장
    await fs.writeFile(dateFilePath, todayDateString);
    console.log(`오늘 날짜 파일 생성: ${dateFilePath}`);

    return NextResponse.json({ message: '데이터 생성 완료', }, { status: 200, }); // 성공 메시지 명시
  } else {
    // 프로덕션 환경 로직 (필요 시 구현)
    return NextResponse.json({ message: '프로덕션 환경에서는 비활성화됨', }, { status: 403, }); // 혹은 다른 적절한 응답
  }
}
