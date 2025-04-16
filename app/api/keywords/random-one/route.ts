import { NextRequest, NextResponse } from 'next/server';
import { Keyword } from '@prisma/client';
import { DB } from '@/api/_libs';

export async function GET(request: NextRequest) {
  const { searchParams, } = request.nextUrl;
  const subCategoryId = searchParams.get('subCategoryId');

  if (!subCategoryId) {
    return NextResponse.json({ error: 'subCategoryId is required', }, { status: 400, });
  }

  try {
    // 1. 해당 서브 카테고리의 키워드 총 개수 가져오기
    const count = await DB.keywords().count({
      where: {
        sub_category_id: subCategoryId,
      },
    });

    if (count === 0) {
      return NextResponse.json({ error: 'No keywords found for this subCategory', }, { status: 404, });
    }

    // 2. 랜덤 인덱스 생성 (0부터 count-1 까지)
    const randomIndex = Math.floor(Math.random() * count);

    // 3. 랜덤 인덱스에 해당하는 키워드 하나 가져오기
    // findMany + skip/take 가 findFirst + skip 보다 일반적으로 권장됨 (Prisma 공식 문서)
    const randomKeywords = await DB.keywords().findMany({
      where: {
        sub_category_id: subCategoryId,
      },
      skip: randomIndex,
      take: 1,
    });

    // findMany는 배열을 반환하므로 첫 번째 요소 확인
    if (!randomKeywords || randomKeywords.length === 0) {
      // 이론적으로 count > 0 이면 여기까지 오지 않아야 하지만 안전 장치
      return NextResponse.json({ error: 'Could not retrieve random keyword', }, { status: 500, });
    }

    const randomKeyword: Keyword = randomKeywords[0];

    // 4. 선택된 키워드 반환
    return NextResponse.json(randomKeyword, { status: 200, });
  } catch (error) {
    console.error('Error fetching random keyword:', error);
    return NextResponse.json({ error: 'Internal Server Error', }, { status: 500, });
  }
}
