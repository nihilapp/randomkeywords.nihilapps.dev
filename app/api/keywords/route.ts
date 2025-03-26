import type { NextRequest } from 'next/server';
import { inArray } from 'drizzle-orm';
import { keywordsTable } from '@/_entities/keywords/table';
import { db } from '@/api/_libs';
import type { CreateKeyword, DeleteKeywords } from '@/_types';

export async function GET() {
  const keywords = await db
    .select()
    .from(keywordsTable);

  return Response.json(keywords, {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  const createKeywordDto: CreateKeyword = await request.json();

  const [ keyword, ] = await db
    .insert(keywordsTable)
    .values(createKeywordDto)
    .returning();

  return Response.json(keyword, {
    status: 201,
  });
}

export async function DELETE(request: NextRequest) {
  const deleteKeywordsDto: DeleteKeywords = await request.json();

  await db
    .delete(keywordsTable)
    .where(inArray(keywordsTable.id, deleteKeywordsDto.ids));

  return Response.json(null, {
    status: 204,
  });
}
