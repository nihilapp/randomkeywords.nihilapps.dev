import { NextRequest, NextResponse } from 'next/server';
import jsons from '@/json/기타.json';
import { DB } from '@/api/_libs';

export async function GET(request: NextRequest) {
  console.log('test');

  const keys = Object.keys(jsons);

  console.log(keys);

  keys.forEach(async (key) => {
    const subCategory = await createKeywords(key, jsons[key]);

    console.log(subCategory);
  });

  return NextResponse.json('', {
    status: 200,
  });
}

async function createKeywords(subCategoryName: string, data: string[]) {
  const subCategory = await DB.subCategories().findFirst({
    where: {
      name: subCategoryName,
    },
  });

  if (!subCategory) {
    return;
  }

  console.log('subCategoryId', subCategory.id);

  await DB.keywords().createMany({
    data: data.map((keyword) => ({
      subCategoryId: subCategory.id,
      keyword,
    })),
  });

  return subCategory;
}
