import { eq } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { categoriesTable } from '@/_entities/categories/table';
import { db } from '@/api/_libs';
import type { UpdateCategory } from '@/_types';

export async function GET(request: NextRequest, { params, }: Params) {
  const [ category, ] = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.id, params.id))
    .limit(1);

  return Response.json(category, {
    status: 200,
  });
}

type Params = {
  params: {
    id: string;
  }
};

export async function PATCH(request: NextRequest, { params, }: Params) {
  const updateCategoryDto: UpdateCategory = await request.json();

  const [ category, ] = await db
    .update(categoriesTable)
    .set(updateCategoryDto)
    .where(eq(categoriesTable.id, params.id))
    .returning();

  return Response.json(category, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest, { params, }: Params) {
  await db
    .delete(categoriesTable)
    .where(eq(categoriesTable.id, params.id));

  return Response.json(null, {
    status: 204,
  });
}
