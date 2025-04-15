import React from 'react';
import { setMeta } from '@/_libs';
import { AddCategoryForm, CategoryList } from '@/(cms)/cms/categories/_components';
import { ToggleBlock } from '@/(common)/_components';

interface Props {}

export const metadata = setMeta({
  title: `카테고리 관리`,
  url: `/cms/categories`,
  robots: 'noindex, nofollow',
});

export default function CmsCategoriesPage() {
  return (
    <div className='flex flex-col gap-5'>
      <ToggleBlock
        title='카테고리 리스트'
      >
        <CategoryList />
      </ToggleBlock>

      <ToggleBlock
        title='카테고리 추가'
      >
        <AddCategoryForm />
      </ToggleBlock>
    </div>
  );
}
