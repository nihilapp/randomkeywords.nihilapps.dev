import type { NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { CreateSubCategory, DeleteSubCategories } from '@/_types';

// 모든 서브 카테고리 조회 (키워드 포함)
export async function GET() {
  const subCategories = await DB.subCategories().findMany({
    include: {
      Keyword: true,
    },
  });

  return Response.json(subCategories, {
    status: 200,
  });
}

// 서브 카테고리 생성
export async function POST(request: NextRequest) {
  const createSubCategoryDto: CreateSubCategory = await request.json();

  const subCategory = await DB.subCategories().create({
    data: createSubCategoryDto,
  });

  return Response.json(subCategory, {
    status: 201,
  });
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
