import { NextResponse } from 'next/server';
import { DB } from '@/api/_libs';

const data = [
  '도구/다구/개수통(-桶)',
  '도구/다구/다정(茶亭)',
  '도구/다구/차상포(茶床布)',
  '도구/다구/다관(茶罐)',
  '도구/다구/자사호(茶匙架)',
  '도구/다구/개반(蓋盤)',
  '도구/다구/잔(盃)',
  '도구/다구/주발(碗)',
  '도구/다구/종지(鍾)',
  '도구/다구/개완',
  '도구/다구/다완',
  '도구/다구/다마(茶磨)',
  '도구/다구/다반(茶盤)',
  '도구/다구/호승(壺承)',
  '도구/다구/퇴수기(退水器)',
  '도구/다구/숙우(熟盂)',
  '도구/다구/공도배(公道杯)',
  '도구/다구/차선(茶筅)',
  '도구/다구/차시(茶匙)',
  '도구/다구/차칙(茶則)',
  '도구/다구/차호(茶壺)',
  '도구/다구/차탁(茶托)',
  '도구/다구/다건(茶巾)',
  '도구/다구/다포(茶布)',
  '도구/다구/차포(茶布)',
  '도구/다구/풍로(風爐)',
  '도구/다구/탕관(湯罐)',
  '도구/다구/물바가지',
  '도구/다구/물항아리',
  '도구/다구/수주(水注)',
  '도구/다구/티팟(Teapot)',
  '도구/다구/사모바르(Samovar)',
  '도구/다구/차이단륵(Çaydanlık)',
  '도구/다구/찻잔(Teacup)',
  '도구/다구/티스푼(Teaspoon)',
  '도구/다구/차 거름망(Tea strainer)',
  '도구/다구/인퓨저(Infuser)',
  '도구/다구/티코지(Teacozy)',
  '도구/다구/티 메저(Tea Measure)',
  '도구/다구/티캐디 스푼(Teacaddy spoon)',
  '도구/다구/티 타이머(Tea timer)',
  '도구/다구/티캐디(Tea caddy)',
  '도구/다구/밀크 저그(Milk jug)',
  '도구/다구/티백 홀더(Tea bag holder)',
  '도구/다구/티 트레이(Tea tray)',
];

export async function GET() {
  const subCategory = await DB.subCategories().findFirst({
    where: {
      name: '도구',
    },
  });

  const keywords = await DB.keywords().createManyAndReturn({
    data: data.map((item) => ({
      keyword: item,
      sub_category_id: subCategory.id,
    })),
  });

  return NextResponse.json(keywords, {
    status: 200,
  });
}
