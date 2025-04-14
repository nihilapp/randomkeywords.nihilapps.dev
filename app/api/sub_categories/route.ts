import type { NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { CreateSubCategory, DeleteSubCategories } from '@/_types';

// 모든 서브 카테고리 조회 -> 커서 기반 페이지네이션 + Category 정보 포함 + 전체 개수
export async function GET(request: NextRequest) {
  // 커서 및 limit 파라미터 처리
  const { searchParams, } = request.nextUrl;
  const limit = parseInt(searchParams.get('limit') ?? '50', 10);
  const cursor = searchParams.get('cursor');

  // 전체 개수 조회
  const totalCount = await DB.subCategories().count();

  // Prisma findMany 수정: 페이지네이션, 정렬, Category include 추가
  const subCategories = await DB.subCategories().findMany({
    take: limit,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor, },
    }),
    orderBy: {
      // 정렬 기준 설정 (id)
      id: 'asc',
    },
    // 연관된 Category의 name 포함
    include: {
      _count: {
        select: {
          keyword: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  // 다음 페이지 cursor 계산
  let nextCursor: typeof cursor | undefined;
  if (subCategories.length === limit) {
    nextCursor = subCategories[limit - 1].id;
  }

  // 응답 형식 변경
  return Response.json({
    items: subCategories,
    nextCursor,
    count: totalCount,
  }, {
    status: 200,
  });
}

// 서브 카테고리 생성
export async function POST(request: NextRequest) {
  const createSubCategoryDto: CreateSubCategory = await request.json();

  // 중복 체크: 전체 서브 카테고리에서 이름으로 검색 (categoryId 조건 제거)
  const findSubCategory = await DB.subCategories().findFirst({
    where: {
      name: createSubCategoryDto.name,
      // categoryId: createSubCategoryDto.categoryId, // 카테고리 구분 없이 이름만으로 중복 체크
    },
  });

  if (findSubCategory) {
    return Response.json({ message: '이미 존재하는 서브 카테고리 이름입니다.', }, { status: 409, }); // 메시지 수정
  }

  // 중복 없을 시 생성
  const subCategory = await DB.subCategories().create({
    data: createSubCategoryDto,
  });

  return Response.json(subCategory, { status: 201, });
}

// 다수 서브 카테고리 삭제
export async function DELETE(request: NextRequest) {
  const deleteSubCategoriesDto: DeleteSubCategories = await request.json();

  await DB.subCategories().deleteMany({
    where: {
      id: {
        in: deleteSubCategoriesDto.ids,
      },
    },
  });

  return Response.json(null, {
    status: 204,
  });
}
