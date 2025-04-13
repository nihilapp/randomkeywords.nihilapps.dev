import { NextResponse, type NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { CreateCategory, DeleteCategories } from '@/_types';

// 카테고리 목록 조회 (서브카테고리 포함)
export async function GET() {
  const categories = await DB.categories().findMany({
    include: {
      SubCategory: true,
    },
    orderBy: {
      order: 'asc',
    },
  });

  return NextResponse.json(categories, {
    status: 200,
  });
}

// 카테고리 생성
export async function POST(request: NextRequest) {
  const createCategoryDto: CreateCategory = await request.json();

  const findCategory = await DB.categories().findFirst({
    where: {
      name: createCategoryDto.name,
    },
  });

  if (findCategory) {
    return NextResponse.json({
      message: '이미 존재하는 카테고리입니다.',
    }, {
      status: 400,
    });
  }

  const category = await DB.categories().create({
    data: createCategoryDto,
  });

  return NextResponse.json(category, {
    status: 201,
  });
}

// 다수 카테고리 삭제
export async function DELETE(request: NextRequest) {
  const deleteCategoriesDto: DeleteCategories = await request.json();

  await DB.categories().deleteMany({
    where: {
      id: {
        in: deleteCategoriesDto.ids,
      },
    },
  });

  return NextResponse.json(null, {
    status: 204,
  });
}
