import { NextRequest } from 'next/server';
import { SubCategory } from '@prisma/client';
import { createResponse, DB } from '@/src/utils';
import { CreateSubCategoryDto } from '@/src/entities';

export async function GET() {
  const subCategories = await DB.subCategories().findMany();

  return createResponse<SubCategory[]>({
    type: 'success',
    resData: subCategories,
    message: 'ok',
    status: 'Ok',
  });
}

export async function POST(request: NextRequest) {
  const createSubCategoryDto: CreateSubCategoryDto = await request.json();

  const subCategory = await DB.subCategories().create({
    data: createSubCategoryDto,
  });

  return createResponse<SubCategory>({
    type: 'success',
    resData: subCategory,
    message: 'ok',
    status: 'Created',
  });
}
