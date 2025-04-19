import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path
      .join(process.cwd(), 'json', '기타.json');

    const fileContent = await fs
      .readFile(filePath, 'utf8');

    const jsonData = JSON.parse(fileContent);

    return NextResponse.json(
      jsonData,
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(
      '기타 관련 데이터 파일 읽기 오류:',
      error
    );

    if (error.code === 'ENOENT') {
      return NextResponse.json(
        {
          error: '기타 관련 데이터 파일을 찾을 수 없습니다.',
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        error: '기타 관련 데이터 파일 읽기 오류',
      },
      { status: 500, }
    );
  }
}
