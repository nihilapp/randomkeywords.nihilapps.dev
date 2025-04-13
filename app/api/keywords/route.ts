import type { NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { CreateKeyword, DeleteKeywords } from '@/_types';

// 모든 키워드 조회 -> 커서 기반 페이지네이션 + 전체 개수 포함
export async function GET(request: NextRequest) {
  // 커서 및 limit 파라미터 처리 (URL 쿼리 스트링에서 추출)
  const { searchParams, } = request.nextUrl;
  // limit: 한 페이지에 가져올 아이템 수 (기본 50개)
  const limit = parseInt(searchParams.get('limit') ?? '50', 10);
  // cursor: 마지막으로 로드된 아이템의 ID (다음 페이지 시작점)
  const cursor = searchParams.get('cursor');

  // 전체 키워드 개수 조회 (페이지네이션과 별개로 전체 count 필요시 사용)
  const totalCount = await DB.keywords().count();

  // Prisma를 사용하여 페이지네이션된 데이터 조회 + SubCategory 정보 포함
  const keywords = await DB.keywords().findMany({
    take: limit, // 요청된 limit만큼 가져오기
    ...(cursor && { // cursor가 있으면
      skip: 1, // cursor 자체는 건너뛰고
      cursor: { id: cursor, }, // 해당 cursor 다음부터 조회
    }),
    orderBy: { // 일관된 순서 유지를 위해 정렬 기준 설정
      id: 'asc',
    },
    // 연관된 SubCategory의 name을 함께 조회
    include: {
      SubCategory: {
        select: {
          name: true,
        },
      },
    },
  });

  // 다음 페이지 요청에 사용할 cursor 계산
  let nextCursor: typeof cursor | undefined;
  // 조회된 데이터 수가 요청된 limit과 같으면 다음 페이지가 있을 수 있음
  if (keywords.length === limit) {
    nextCursor = keywords[limit - 1].id; // 마지막 아이템의 ID를 다음 cursor로 설정
  }

  // 응답 데이터 구성
  return Response.json({
    items: keywords, // 현재 페이지의 키워드 목록
    nextCursor, // 다음 페이지를 위한 cursor (없으면 undefined)
    count: totalCount, // 전체 키워드 개수
  }, {
    status: 200,
  });
}

// 키워드 생성
export async function POST(request: NextRequest) {
  const createKeywordDto: CreateKeyword = await request.json();

  const findKeyword = await DB.keywords().findFirst({
    where: {
      keyword: createKeywordDto.keyword,
    },
  });

  if (findKeyword) {
    return Response.json({
      message: '이미 존재하는 키워드입니다.',
    }, {
      status: 409,
    });
  }

  const keyword = await DB.keywords().create({
    data: createKeywordDto,
  });

  return Response.json(keyword, {
    status: 201,
  });
}

// 다수 키워드 삭제
export async function DELETE(request: NextRequest) {
  const deleteKeywordsDto: DeleteKeywords = await request.json();

  await DB.keywords().deleteMany({
    where: {
      id: {
        in: deleteKeywordsDto.ids,
      },
    },
  });

  return Response.json(null, {
    status: 204,
  });
}
