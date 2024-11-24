import { NextRequest } from 'next/server';
import { createResponse, DB } from '@/src/utils';
import { ExtendedSubCategory } from '@/src/entities';

interface Params {
  params: Promise<{ id: string; }>;
}

export async function GET(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  const subCategory = await DB.subCategories().findFirst({
    where: {
      id,
    },
    include: {
      Keyword: true,
    },
  });

  return createResponse<ExtendedSubCategory>({
    type: 'success',
    resData: subCategory,
    message: 'ok',
    status: 'Ok',
  });
}

export async function DELETE(req: NextRequest, { params, }: Params) {
  const { id, } = await params;

  await DB.subCategories().delete({
    where: {
      id,
    },
  });

  return createResponse<null>({
    type: 'success',
    resData: null,
    message: 'ok',
    status: 'Ok',
  });
}
