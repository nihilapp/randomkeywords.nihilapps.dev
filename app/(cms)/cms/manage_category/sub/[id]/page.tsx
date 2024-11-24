import React from 'react';
import { setMeta } from '@/src/utils';
import { SubCategoryDetail } from './_components';

interface Props {
  children?: React.ReactNode;
}

export const metadata = setMeta({
  title: ``,
  url: ``,
});

export default function SubCategoryDetailPage() {
  return (
    <SubCategoryDetail />
  );
}
