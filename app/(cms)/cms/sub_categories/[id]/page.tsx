import React from 'react';
import { setMeta } from '@/_libs';
import { SubCategoriesQuery } from '@/_features';
import { SubCategoryDetail } from '@/(cms)/cms/sub_categories/_components';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params, }: Props) {
  const { id, } = await params;

  const subCategory = await SubCategoriesQuery.getById(id);

  return setMeta({
    title: `${subCategory.name} 서브 카테고리 정보`,
    url: `/cms/sub_categories/${id}`,
  });
}

export default async function page({ params, }: Props) {
  const { id, } = await params;

  return (
    <SubCategoryDetail id={id} />
  );
}
