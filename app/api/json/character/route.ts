import { NextResponse } from 'next/server';
import fs from 'fs/promises'; // Node.js 파일 시스템 모듈 사용
import path from 'path'; // Node.js 경로 모듈 사용

export async function GET() {
  try {
    // process.cwd()는 프로젝트 루트 디렉토리를 반환합니다.
    // public 디렉토리 내의 JSON 파일 경로를 구성합니다.
    const filePath = path.join(process.cwd(), 'json', '캐릭터 관련.json');

    // 파일을 비동기적으로 읽습니다. 인코딩을 utf8로 지정합니다.
    const fileContent = await fs.readFile(filePath, 'utf8');

    // 읽어온 JSON 문자열을 파싱합니다.
    const jsonData = JSON.parse(fileContent);

    // 파싱된 JSON 데이터를 응답으로 반환합니다.
    return NextResponse.json(jsonData, { status: 200, });
  } catch (error: any) {
    console.error('Error reading character.json:', error);

    // 파일이 존재하지 않는 경우 (ENOENT) 404 에러 반환
    if (error.code === 'ENOENT') {
      return NextResponse.json({ error: 'Character data file not found.', }, { status: 404, });
    }

    // 그 외 파일 읽기 오류나 JSON 파싱 오류는 500 에러 반환
    return NextResponse.json({ error: 'Internal Server Error reading character data.', }, { status: 500, });
  }
}
