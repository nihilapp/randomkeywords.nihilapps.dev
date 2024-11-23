import { NextRequest } from 'next/server';
import { Category } from '@prisma/client';
import { createResponse, DB } from '@/src/utils';
import { CreateCategoryDto } from '@/src/entities';

export async function GET() {
  const categories = await DB.categories().findMany({
    orderBy: {
      order: 'asc',
    },
  });

  return createResponse<Category[]>({
    type: 'success',
    resData: categories,
    message: 'ok',
    status: 'Ok',
  });
}

export async function POST(request: NextRequest) {
  const createCategoryDto: CreateCategoryDto = await request.json();

  const category = await DB.categories().create({
    data: createCategoryDto,
  });

  return createResponse<Category>({
    type: 'success',
    resData: category,
    message: 'ok',
    status: 'Created',
  });
}
