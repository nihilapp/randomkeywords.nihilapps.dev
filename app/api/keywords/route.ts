import type { NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { CreateKeyword, DeleteKeywords } from '@/_types';

// 모든 키워드 조회
export async function GET() {
  const keywords = await DB.keywords().findMany();

  return Response.json(keywords, {
    status: 200,
  });
}

// 키워드 생성
export async function POST(request: NextRequest) {
  const createKeywordDto: CreateKeyword = await request.json();

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
