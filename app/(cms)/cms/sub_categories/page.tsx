import React from 'react';
import { setMeta } from '@/_libs';

interface Props {}

export const metadata = setMeta({
  title: `서브 카테고리 관리`,
  url: `/cms/sub_categories`,
});

export default function CmsSubCategoriesPage() {
  return (
    <div>content</div>
  );
}
