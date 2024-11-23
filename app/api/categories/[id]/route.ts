import { NextRequest } from 'next/server';
import { Category } from '@prisma/client';
import { createResponse, DB } from '@/src/utils';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params, }: Params) {
  const category = await DB.categories().findFirst({
    where: {
      id: params.id,
    },
  });

  return createResponse<Category>({
    type: 'success',
    resData: category,
    message: 'ok',
    status: 'Ok',
  });
}
