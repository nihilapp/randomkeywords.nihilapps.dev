import type { NextRequest } from 'next/server';
import { eq, inArray } from 'drizzle-orm';
import { subCategoriesTable } from '@/_entities/sub_categories/table';
import { db } from '@/api/_libs';
import type { CreateSubCategory, DeleteSubCategories } from '@/_types';
import { keywordsTable } from '@/_entities/keywords/table';

export async function GET() {
  const subCategories = await db
    .select()
    .from(subCategoriesTable)
    .leftJoin(
      keywordsTable,
      eq(
        subCategoriesTable.id,
        keywordsTable.sub_category_id
      )
    );

  return Response.json(subCategories, {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  const createSubCategoryDto: CreateSubCategory = await request.json();

  const [ subCategory, ] = await db
    .insert(subCategoriesTable)
    .values(createSubCategoryDto)
    .returning();

  return Response.json(subCategory, {
    status: 201,
  });
}

export async function DELETE(request: NextRequest) {
  const deleteSubCategoriesDto: DeleteSubCategories = await request.json();

  await db
    .delete(subCategoriesTable)
    .where(inArray(subCategoriesTable.id, deleteSubCategoriesDto.ids));

  return Response.json(null, {
    status: 204,
  });
}
