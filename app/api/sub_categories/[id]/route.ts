import type { NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { UpdateSubCategory } from '@/_types';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// 특정 ID의 서브 카테고리 조회 (키워드 포함)
export async function GET(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  const subCategory = await DB.subCategories().findUnique({
    where: {
      id,
    },
    include: {
      Keyword: true,
    },
  });

  if (!subCategory) {
    return Response.json({ message: '서브 카테고리를 찾을 수 없습니다.', }, { status: 404, });
  }

  return Response.json(subCategory, {
    status: 200,
  });
}

// 서브 카테고리 업데이트
export async function PATCH(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  const updateSubCategoryDto: UpdateSubCategory = await request.json();

  const subCategory = await DB.subCategories().update({
    where: {
      id,
    },
    data: updateSubCategoryDto,
  });

  return Response.json(subCategory, {
    status: 200,
  });
}

// 서브 카테고리 삭제
export async function DELETE(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  await DB.subCategories().delete({
    where: {
      id,
    },
  });

  return Response.json(null, {
    status: 204,
  });
}
