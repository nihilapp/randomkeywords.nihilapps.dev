import { NextResponse, type NextRequest } from 'next/server';
import type { Prisma } from '@/_prisma/client';
import { DB } from '@/api/_libs';

// 한 페이지에 보여줄 기본 개수
const LIMIT = 50;

export async function GET(request: NextRequest) {
  try {
    const { searchParams, } = new URL(request.url);
    const cursor = searchParams.get('cursor') ?? undefined;
    const word = searchParams.get('word');
    // limit 처리 수정: Number.isNaN 사용 및 radix 명시
    const limitParam = searchParams.get('limit');
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : NaN; // 10진수로 변환 시도
    const limit = !Number.isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : LIMIT; // 유효한 양수인지 확인
    const sub_category_id = searchParams.get('subCategoryId');

    // 검색어 유효성 검사
    if (!word) {
      return NextResponse.json(
        { message: '검색어가 필요합니다.', },
        { status: 400, }
      );
    }

    // Prisma 쿼리 where 조건 객체화
    const whereCondition: Prisma.KeywordWhereInput = {
      keyword: {
        contains: word,
        mode: 'insensitive',
      },
    };

    // subCategoryId 조건 추가 (존재하고 'all'이 아닐 경우)
    if (sub_category_id && sub_category_id !== 'all') {
      whereCondition.sub_category_id = sub_category_id;
    }

    // 검색 쿼리 설정
    const args: Prisma.KeywordFindManyArgs = {
      take: limit,
      where: whereCondition,
      include: {
        sub_category: { select: { name: true, }, }, // 연관된 서브카테고리 이름 포함
      },
      orderBy: {
        created_at: 'desc', // 최신순 정렬
      },
    };

    // 커서 기반 페이지네이션 설정
    if (cursor) {
      args.cursor = { id: cursor, };
      args.skip = 1; // cursor는 포함하지 않기 위해 skip
    }

    // 데이터 조회
    const items = await DB.keywords().findMany(args);

    // 다음 페이지 커서 설정
    let nextCursor: string | undefined;
    if (items.length === limit) {
      nextCursor = items[items.length - 1].id;
    }

    // 전체 검색 결과 개수 조회
    const count = await DB.keywords().count({
      where: whereCondition,
    });

    // 결과 반환
    return NextResponse.json({
      items,
      nextCursor,
      count,
    });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json(
      {
        message: '서버 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500, }
    );
  }
}
