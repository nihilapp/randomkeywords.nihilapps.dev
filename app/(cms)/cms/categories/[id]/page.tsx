import React from 'react';
import { setMeta } from '@/_libs';
import { CategoriesQuery } from '@/_features';
import { CategoryDetail } from '@/(cms)/cms/categories/_components';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params, }: Props) {
  const { id, } = await params;

  const category = await CategoriesQuery.getById(id);

  return setMeta({
    title: `${category.name} 카테고리 정보`,
    url: `/cms/categories/${id}`,
    robots: 'noindex, nofollow',
  });
}

export default async function page({ params, }: Props) {
  const { id, } = await params;

  return (
    <CategoryDetail id={id} />
  );
}
