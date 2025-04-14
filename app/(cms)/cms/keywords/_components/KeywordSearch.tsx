'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchingList } from './SearchingList';

export function KeywordSearch() {
  const searchParams = useSearchParams();
  const word = searchParams.get('word') ?? '';
  const sub_category_id = searchParams.get('sub_category_id') ?? 'all';

  return (
    <SearchingList
      word={word}
      sub_category_id={sub_category_id}
    />
  );
}
