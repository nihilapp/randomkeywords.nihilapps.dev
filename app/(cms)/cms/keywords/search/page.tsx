import React from 'react';
import { setMeta } from '@/_libs';
import { KeywordSearch } from '@/(cms)/cms/keywords/_components';

interface Props {}

export const metadata = setMeta({
  title: `키워드 검색`,
  url: `/cms/keywords/search`,
});

export default function KeywordSearchPage() {
  return (
    <KeywordSearch />
  );
}
