import { eq } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { subCategoriesTable } from '@/_entities/sub_categories/table';
import { db } from '@/api/_libs';
import type { UpdateSubCategory } from '@/_types';
import { keywordsTable } from '@/_entities/keywords/table';

export async function GET(request: NextRequest, { params, }: Params) {
  const [ subCategory, ] = await db
    .select()
    .from(subCategoriesTable)
    .where(eq(subCategoriesTable.id, params.id))
    .leftJoin(
      keywordsTable,
      eq(
        subCategoriesTable.id,
        keywordsTable.sub_category_id
      )
    );

  return Response.json(subCategory, {
    status: 200,
  });
}

type Params = {
  params: {
    id: string;
  }
};

export async function PATCH(request: NextRequest, { params, }: Params) {
  const updateSubCategoryDto: UpdateSubCategory = await request.json();

  const [ subCategory, ] = await db
    .update(subCategoriesTable)
    .set(updateSubCategoryDto)
    .where(eq(subCategoriesTable.id, params.id))
    .returning();

  return Response.json(subCategory, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest, { params, }: Params) {
  await db
    .delete(subCategoriesTable)
    .where(eq(subCategoriesTable.id, params.id));

  return Response.json(null, {
    status: 204,
  });
}
