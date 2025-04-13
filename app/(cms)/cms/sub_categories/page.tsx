import React from 'react';
import { setMeta } from '@/_libs';
import { ToggleBlock } from '@/(common)/_components';
import { SubCategoryList } from '@/(cms)/cms/sub_categories/_components';

interface Props {}

export const metadata = setMeta({
  title: `서브 카테고리 관리`,
  url: `/cms/sub_categories`,
});

export default function CmsSubCategoriesPage() {
  return (
    <div className='space-y-5'>
      <ToggleBlock
        title='서브 카테고리 리스트'
      >
        <SubCategoryList />
      </ToggleBlock>
    </div>
  );
}
