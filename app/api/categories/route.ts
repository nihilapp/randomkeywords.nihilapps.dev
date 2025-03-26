import type { NextRequest } from 'next/server';
import { eq, inArray } from 'drizzle-orm';
import { categoriesTable } from '@/_entities/categories/table';
import { db } from '@/api/_libs';
import type { CreateCategory, DeleteCategories } from '@/_types';
import { subCategoriesTable } from '@/_entities/sub_categories/table';

export async function GET() {
  const categories = await db
    .select()
    .from(categoriesTable)
    .orderBy(categoriesTable.order)
    .leftJoin(
      subCategoriesTable,
      eq(
        categoriesTable.id,
        subCategoriesTable.category_id
      )
    );

  return Response.json(categories, {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  const createCategoryDto: CreateCategory = await request.json();

  const [ category, ] = await db
    .insert(categoriesTable)
    .values(createCategoryDto)
    .returning();

  return Response.json(category, {
    status: 201,
  });
}

export async function DELETE(request: NextRequest) {
  const deleteCategoriesDto: DeleteCategories = await request.json();

  await db
    .delete(categoriesTable)
    .where(inArray(categoriesTable.id, deleteCategoriesDto.ids));

  return Response.json(null, {
    status: 204,
  });
}
