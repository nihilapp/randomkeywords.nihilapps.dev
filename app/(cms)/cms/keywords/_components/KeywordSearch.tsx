'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchingList } from './SearchingList';

export function KeywordSearch() {
  const searchParams = useSearchParams();
  const word = searchParams.get('word') ?? '';
  const subCategoryId = searchParams.get('subCategoryId') ?? 'all';

  return (
    <SearchingList
      word={word}
      subCategoryId={subCategoryId}
    />
  );
}
