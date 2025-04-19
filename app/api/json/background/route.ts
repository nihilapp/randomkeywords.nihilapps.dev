import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface BackgroundJson {
  목적현실: string[];
  목적가상: string[];
  출신지기본: string[];
  출신지현실: string[];
  출신지가상_수식: string[];
  출신지가상_장소: string[];
}

interface CharacterJson {
  [key: string]: string[];
}

function getOriginFantasy(originBasic: string[], originPrefix: string[], originPlace: string[]) {
  const originFantasy: string[] = [];
  originPrefix.forEach((prefix) => {
    originPlace.forEach((place) => {
      originFantasy.push(`${prefix} ${place}`);
    });
  });

  return [ ...originBasic, ...originFantasy, ];
}

export async function GET() {
  try {
    const backgroundFilePath = path
      .join(process.cwd(), 'json', '배경스토리 관련.json');
    const characterFilePath = path
      .join(process.cwd(), 'json', '캐릭터 관련.json');

    const readFilePromises = [
      fs.readFile(backgroundFilePath, 'utf8'),
      fs.readFile(characterFilePath, 'utf8'),
    ];

    const [ backgroundFileContent, characterFileContent, ] = await Promise.all(readFilePromises);

    const backgroundJsonData = JSON.parse(backgroundFileContent) as BackgroundJson;
    const characterJsonData = JSON.parse(characterFileContent) as CharacterJson;

    const {
      목적현실,
      목적가상,
      출신지기본,
      출신지현실,
      출신지가상_수식,
      출신지가상_장소,
    } = backgroundJsonData;

    const purposeReal = 목적현실;
    const purposeFantasy = 목적가상;
    const originReal = [ ...출신지기본, ...출신지현실, ];
    const originFantasy = getOriginFantasy(
      출신지기본,
      출신지가상_수식,
      출신지가상_장소
    );
    const classReal = characterJsonData['현실직업'];
    const classFantasy = characterJsonData['가상직업'];

    const realLength = purposeReal.length * originReal.length * classReal.length;
    const fantasyLength = purposeFantasy.length * originFantasy.length * classFantasy.length;

    return NextResponse.json(
      {
        real: {
          purpose: purposeReal,
          origin: originReal,
          class: classReal,
          count: realLength,
        },
        fantasy: {
          purpose: purposeFantasy,
          origin: originFantasy,
          class: classFantasy,
          count: fantasyLength,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(
      '배경스토리 관련 데이터 파일 읽기 오류:',
      error
    );

    if (error.code === 'ENOENT') {
      return NextResponse.json(
        {
          error: '배경스토리 관련 데이터 파일을 찾을 수 없습니다.',
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        error: '배경스토리 관련 데이터 파일 읽기 오류',
      },
      {
        status: 500,
      }
    );
  }
}
