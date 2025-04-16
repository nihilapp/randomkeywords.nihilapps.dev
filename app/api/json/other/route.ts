import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'json', '기타.json'); // 파일 이름 변경
    const fileContent = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    return NextResponse.json(jsonData, { status: 200, });
  } catch (error: any) {
    console.error('Error reading other.json:', error);
    if (error.code === 'ENOENT') {
      return NextResponse.json({ error: 'Other data file not found.', }, { status: 404, });
    }
    return NextResponse.json({ error: 'Internal Server Error reading other data.', }, { status: 500, });
  }
}
