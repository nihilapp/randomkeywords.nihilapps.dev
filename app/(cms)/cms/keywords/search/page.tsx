import React, { Suspense } from 'react';
import { setMeta } from '@/_libs';
import { KeywordSearch } from '@/(cms)/cms/keywords/_components';
import { LoadingCircle } from '@/(common)/_components';

interface Props {}

export const metadata = setMeta({
  title: `키워드 검색`,
  url: `/cms/keywords/search`,
  robots: 'noindex, nofollow',
});

export default function KeywordSearchPage() {
  return (
    <Suspense fallback={<LoadingCircle />}>
      <KeywordSearch />
    </Suspense>
  );
}
