import React from 'react';
import { setMeta } from '@/src/utils';
import { AddCategory } from './_components';

interface Props {
  children?: React.ReactNode;
}

export const metadata = setMeta({
  title: `카테고리 생성`,
  url: `/cms/add_category`,
});

export default function AddCategoryPage() {
  return (
    <AddCategory />
  );
}
