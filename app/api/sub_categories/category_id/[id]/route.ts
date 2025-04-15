import { NextRequest, NextResponse } from 'next/server';
import { DB } from '@/api/_libs';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  const subCategories = await DB.subCategories().findMany({
    where: {
      category: {
        id,
      },
    },
    include: {
      _count: {
        select: {
          keyword: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(subCategories);
}
