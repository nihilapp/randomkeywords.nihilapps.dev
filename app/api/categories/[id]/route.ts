import { eq } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { categoriesTable } from '@/_entities/categories/table';
import { db } from '@/api/_libs';
import type { UpdateCategory } from '@/_types';
import { subCategoriesTable } from '@/_entities/sub_categories/table';

export async function GET(request: NextRequest, { params, }: Params) {
  const [ category, ] = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.id, params.id))
    .leftJoin(
      subCategoriesTable,
      eq(
        categoriesTable.id,
        subCategoriesTable.category_id
      )
    );

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
