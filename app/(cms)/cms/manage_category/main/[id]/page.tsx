import React from 'react';
import { setMeta } from '@/src/utils';
import { CategoryDetail } from './_components';
import { CategoriesQuery } from '@/src/features/query';

interface Props {
  params: Promise<{ id: string; }>;
}

export async function generateMetadata({ params, }: Props) {
  const { id, } = await params;

  const { resData, } = await CategoriesQuery
    .getCategory(id);

  return setMeta({
    title: `카테고리 ${resData.name} 정보`,
    url: `/cms/manage_category/main/${resData.id}`,
  });
}

export default async function CategoryDetailPage({ params, }: Props) {
  const { id, } = await params;

  return (
    <CategoryDetail id={id} />
  );
}
