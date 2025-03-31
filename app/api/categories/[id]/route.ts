import { NextResponse, type NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { UpdateCategory } from '@/_types';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// 특정 ID의 카테고리 조회 (서브카테고리 포함)
export async function GET(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  const category = await DB.categories().findUnique({
    where: {
      id,
    },
    include: {
      SubCategory: true,
    },
  });

  if (!category) {
    return NextResponse.json({ message: '카테고리를 찾을 수 없습니다.', }, { status: 404, });
  }

  return NextResponse.json(category, {
    status: 200,
  });
}

// 카테고리 업데이트
export async function PATCH(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  const updateCategoryDto: UpdateCategory = await request.json();

  // BigInt로 형변환이 필요한 경우 처리
  const updateData: any = { ...updateCategoryDto, };
  if (typeof updateData.order === 'number') {
    updateData.order = BigInt(updateData.order);
  }

  const category = await DB.categories().update({
    where: {
      id,
    },
    data: updateData,
  });

  return Response.json(category, {
    status: 200,
  });
}

// 카테고리 삭제
export async function DELETE(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  await DB.categories().delete({
    where: {
      id,
    },
  });

  return NextResponse.json(null, {
    status: 204,
  });
}
