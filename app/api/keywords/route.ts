import { Keyword, Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { createResponse, DB } from '@/src/utils';
import { CreateKeywordDto } from '@/src/entities';
import { tools } from '@/src/utils/tools';

export async function GET() {
  const keywords = await DB.keywords().findMany();

  return createResponse<Keyword[]>({
    type: 'success',
    resData: keywords,
    message: 'ok',
    status: 'Ok',
  });
}

export async function POST(request: NextRequest) {
  const { keyword, subCategoryId, }: CreateKeywordDto = await request.json();

  const parsedKeyword = tools.common.parse<string[] | string>(keyword);

  let isArray: boolean;

  if (Array.isArray(parsedKeyword)) {
    isArray = true;
  } else {
    isArray = false;
  }

  if (isArray) {
    const findKeywords = await DB.keywords().findMany({
      where: {
        keyword: {
          in: parsedKeyword as string[],
        },
      },
    });

    console.log('findKeywords >> ', findKeywords);

    if (findKeywords.length > 0) {
      return createResponse<null>({
        type: 'error',
        resData: null,
        message: 'Conflict',
        status: 'Conflict',
      });
    }

    const keywords = await DB.keywords().createMany({
      data: (parsedKeyword as string[]).map((keyword) => ({
        keyword,
        subCategoryId,
      })),
    });

    return createResponse<Prisma.BatchPayload>({
      type: 'success',
      resData: keywords,
      message: 'ok',
      status: 'Created',
    });
  }

  // const newKeyword = await DB.keywords().create({
  //   data: {
  //     keyword,
  //     subCategoryId,
  //   },
  // });

  // return createResponse<Keyword>({
  //   type: 'success',
  //   resData: newKeyword,
  //   message: 'ok',
  //   status: 'Created',
  // });

  return NextResponse.json({}, {
    status: 201,
  });
}
