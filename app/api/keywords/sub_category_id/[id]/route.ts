import { NextRequest, NextResponse } from 'next/server';
import { DB } from '@/api/_libs';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params, }: Params) {
  const { id, } = await params;

  const keywords = await DB.keywords().findMany({
    where: {
      sub_category_id: id,
    },
  });

  return NextResponse.json(keywords);
}
