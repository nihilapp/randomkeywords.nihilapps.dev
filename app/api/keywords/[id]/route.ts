import type { NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { UpdateKeyword } from '@/_types';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// 특정 ID의 키워드 조회
export async function GET(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  const keyword = await DB.keywords().findUnique({
    where: {
      id,
    },
  });

  if (!keyword) {
    return Response.json({ message: '키워드를 찾을 수 없습니다.', }, { status: 404, });
  }

  return Response.json(keyword, {
    status: 200,
  });
}

// 키워드 업데이트
export async function PATCH(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  const updateKeywordDto: UpdateKeyword = await request.json();

  const keyword = await DB.keywords().update({
    where: {
      id,
    },
    data: updateKeywordDto,
  });

  return Response.json(keyword, {
    status: 200,
  });
}

// 키워드 삭제
export async function DELETE(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  await DB.keywords().delete({
    where: {
      id,
    },
  });

  return Response.json(null, {
    status: 204,
  });
}
