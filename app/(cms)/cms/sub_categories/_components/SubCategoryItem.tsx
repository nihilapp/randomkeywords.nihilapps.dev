'use client';

import React from 'react';
import { useGetSubCategoryById } from '@/_hooks/query/sub_categories';
import { ListItem, LoadingCircle } from '@/(common)/_components';

interface Props {
  id: string;
}

export function SubCategoryItem({ id, }: Props) {
  const { subCategory, loading, done, } = useGetSubCategoryById(id);

  return (
    <>
      {loading && (
        <LoadingCircle />
      )}
      {done && (
        <ListItem
          href={`/cms/sub_categories/${id}`}
          name={subCategory.name}
          length={subCategory.Keyword.length || 0}
        />
      )}
    </>
  );
}
