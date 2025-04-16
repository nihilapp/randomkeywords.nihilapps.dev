import { NextResponse } from 'next/server';
import { DB } from '@/api/_libs';

export async function GET() {
  const purposeFantasyData = await DB.keywords().findMany({
    where: {
      sub_category: {
        name: '목적가상',
      },
    },
  });
  const purposeFantasy = purposeFantasyData
    .map((item) => item.keyword);

  const purposeRealData = await DB.keywords().findMany({
    where: {
      sub_category: {
        name: '목적현실',
      },
    },
  });
  const purposeReal = purposeRealData
    .map((item) => item.keyword);

  const originFantasyFormulaData = await DB.keywords().findMany({
    where: {
      sub_category: {
        name: '출신지가상_수식',
      },
    },
  });
  const originFantasyFormula = originFantasyFormulaData
    .map((item) => item.keyword);

  const originFantasyPlaceData = await DB.keywords().findMany({
    where: {
      sub_category: {
        name: '출신지가상_장소',
      },
    },
  });
  const originFantasyPlace = originFantasyPlaceData
    .map((item) => item.keyword);

  const originBasicData = await DB.keywords().findMany({
    where: {
      sub_category: {
        name: '출신지기본',
      },
    },
  });
  const originBasic = originBasicData
    .map((item) => item.keyword);

  const originRealData = await DB.keywords().findMany({
    where: {
      sub_category: {
        name: '출신지현실',
      },
    },
  });
  const originReal = originRealData
    .map((item) => item.keyword);

  const classRealData = await DB.keywords().findMany({
    where: {
      sub_category: {
        name: '현실직업',
      },
    },
  });
  const classReal = classRealData
    .map((item) => item.keyword);

  const classFantasyData = await DB.keywords().findMany({
    where: {
      sub_category: {
        name: '가상직업',
      },
    },
  });
  const classFantasy = classFantasyData
    .map((item) => item.keyword);

  function originFantasy() {
    const allFantasyOrigin = originFantasyFormula
      .map((prefix) => {
        return originFantasyPlace.map((place) => {
          return `${prefix} ${place}`;
        });
      })
      .flat();

    return [ ...allFantasyOrigin, ...originBasic, ];
  }

  return NextResponse.json({
    real: {
      purpose: purposeReal,
      origin: [ ...originReal, ...originBasic, ],
      class: classReal,
      count: purposeReal.length * originReal.length * classReal.length,
    },
    fantasy: {
      purpose: purposeFantasy,
      origin: originFantasy(),
      class: classFantasy,
      count: purposeFantasy.length * originFantasy().length * classFantasy.length,
    },
  }, {
    status: 200,
  });
}
