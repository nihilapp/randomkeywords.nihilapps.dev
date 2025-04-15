'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn, selectFive, selectOne } from '@/_libs';
import { useGetKeywordsBySubCategoryId } from '@/_hooks/query/keywords';
import { useKeywordStore } from '@/_entities/keywords';

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  name: string;
  length: number;
  subCategoryId: string;
}

const cssVariants = cva(
  [
    `p-2 rounded-2 border border-black-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 ease-in-out cursor-pointer`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function RandomButton({
  styles, name, length, subCategoryId, ...props
}: Props) {
  const { keywords, loading, done, } = useGetKeywordsBySubCategoryId(subCategoryId);

  const { setSelectedKeyword, setSubCategory, } = useKeywordStore();

  const onClickButton = () => {
    if (loading) {
      return;
    }

    if (done) {
      const randomKeyword = selectOne(keywords);

      setSelectedKeyword(randomKeyword.keyword);
      setSubCategory(name);
    }
  };

  return (
    <button
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
      onClick={onClickButton}
    >
      {name} ({length}개)
    </button>
  );
}
