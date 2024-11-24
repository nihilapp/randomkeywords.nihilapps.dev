import { NextRequest } from 'next/server';
import { Category } from '@prisma/client';
import { createResponse, DB } from '@/src/utils';
import { CreateCategoryDto, ExtendedCategory } from '@/src/entities';

export async function GET() {
  const categories = await DB.categories().findMany({
    include: {
      SubCategory: true,
    },
    orderBy: {
      order: 'asc',
    },
  });

  return createResponse<ExtendedCategory[]>({
    type: 'success',
    resData: categories,
    message: 'ok',
    status: 'Ok',
  });
}

export async function POST(request: NextRequest) {
  const createCategoryDto: CreateCategoryDto = await request.json();

  const findCategory = await DB.categories().findFirst({
    where: {
      name: createCategoryDto.name,
    },
  });

  if (findCategory) {
    return createResponse<null>({
      type: 'error',
      resData: null,
      message: '이미 존재하는 카테고리입니다.',
      status: 'Conflict',
    });
  }

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
