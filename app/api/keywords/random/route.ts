import { NextResponse, type NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import { selectOne } from '@/_libs';

export async function GET(req: NextRequest) {
  const allKeywords = await DB.keywords().findMany();

  const { searchParams, } = req.nextUrl;
  const count = searchParams.get('count');

  const keywordsCount = count ? parseInt(count, 10) : 1;

  function randomKeywords() {
    const randomKeywords = [];

    for (let i = 0; i < keywordsCount; i++) {
      const randomKeyword = selectOne(allKeywords);

      // 중복 없어야함.
      if (!randomKeywords.includes(randomKeyword)) {
        randomKeywords.push(randomKeyword);
      } else {
        // 중복일 경우 i를 감소시켜 다시 시도
        i--;
      }
    }

    return randomKeywords;
  }

  return NextResponse.json(randomKeywords(), {
    status: 200,
  });
}
