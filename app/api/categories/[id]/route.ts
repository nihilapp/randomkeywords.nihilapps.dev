import { NextRequest } from 'next/server';
import { createResponse, DB } from '@/src/utils';
import { ExtendedCategory } from '@/src/entities';

interface Params {
  params: Promise<{ id: string; }>;
}

export async function GET(req: NextRequest, { params, }: Params) {
  const { id, } = await params;

  const category = await DB.categories().findFirst({
    where: {
      id,
    },
    include: {
      SubCategory: true,
    },
  });

  return createResponse<ExtendedCategory>({
    type: 'success',
    resData: category,
    message: 'ok',
    status: 'Ok',
  });
}

export async function DELETE(req: NextRequest, { params, }: Params) {
  const { id, } = await params;

  await DB.categories().delete({
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
