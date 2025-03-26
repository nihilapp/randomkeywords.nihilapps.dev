import { eq } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { keywordsTable } from '@/_entities/keywords/table';
import { db } from '@/api/_libs';
import type { UpdateKeyword } from '@/_types';

export async function GET(request: NextRequest, { params, }: Params) {
  const [ keyword, ] = await db
    .select()
    .from(keywordsTable)
    .where(eq(keywordsTable.id, params.id));

  return Response.json(keyword, {
    status: 200,
  });
}

type Params = {
  params: {
    id: string;
  }
};

export async function PATCH(request: NextRequest, { params, }: Params) {
  const updateKeywordDto: UpdateKeyword = await request.json();

  const [ keyword, ] = await db
    .update(keywordsTable)
    .set(updateKeywordDto)
    .where(eq(keywordsTable.id, params.id))
    .returning();

  return Response.json(keyword, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest, { params, }: Params) {
  await db
    .delete(keywordsTable)
    .where(eq(keywordsTable.id, params.id));

  return Response.json(null, {
    status: 204,
  });
}
