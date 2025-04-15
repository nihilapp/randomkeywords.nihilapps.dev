import { NextRequest, NextResponse } from 'next/server';
import { DB } from '@/api/_libs';

interface Params {
  params: Promise<{
    name: string;
  }>;
}

export async function GET(req: NextRequest, { params, }: Params) {
  const { name, } = await params;

  const category = await DB.categories().findFirst({
    where: {
      name,
    },
    include: {
      sub_category: {
        include: {
          _count: {
            select: { keyword: true, },
          },
        },
      },
    },
  });

  if (!category) {
    return NextResponse.json(
      { error: '카테고리를 찾을 수 없습니다.', },
      { status: 404, }
    );
  }

  return NextResponse.json(category);
}
