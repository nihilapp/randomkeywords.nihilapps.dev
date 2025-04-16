import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'json', '배경스토리 관련.json'); // 파일 이름 변경
    const fileContent = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    return NextResponse.json(jsonData, { status: 200, });
  } catch (error: any) {
    console.error('Error reading background.json:', error); // 로그 메시지 변경
    if (error.code === 'ENOENT') {
      return NextResponse.json({ error: 'Background data file not found.', }, { status: 404, }); // 에러 메시지 변경
    }
    return NextResponse.json({ error: 'Internal Server Error reading background data.', }, { status: 500, }); // 에러 메시지 변경
  }
}
