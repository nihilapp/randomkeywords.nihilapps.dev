import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { NextRequest } from 'next/server';
import { createResponse } from '@/src/utils';
import { CreateCategoryDto } from '@/src/entities';

export async function GET() {
  const fileArray = readdirSync(
    join(process.cwd(), 'keywords')
  );

  const categories = fileArray.map((file) => (
    file.replace('.txt', '')
  ));

  return createResponse({
    type: 'success',
    resData: categories,
    message: '카테고리 조회 성공',
    status: 'Ok',
  });
}

export async function POST(req: NextRequest) {
  const createCategoryDto: CreateCategoryDto = await req.json();

  writeFileSync(
    join(process.cwd(), 'keywords', `${createCategoryDto.name}.txt`),
    '',
    {
      encoding: 'utf-8',
    }
  );

  return createResponse({
    type: 'success',
    resData: null,
    message: '카테고리 생성 성공',
    status: 'Ok',
  });
}
