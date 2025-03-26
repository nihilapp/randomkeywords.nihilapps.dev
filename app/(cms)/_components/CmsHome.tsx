'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { useGetCategories } from '@/_hooks/query/categories';
import { useGetSubCategories } from '@/_hooks/query/sub_categories';
import { useGetKeywords } from '@/_hooks/query/keywords';
import { LoadingCircle } from '@/(common)/_components';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
}

const cssVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CmsHome({ styles, ...props }: Props) {
  const {
    categories,
    loading: categoriesLoading,
    done: categoriesDone,
  } = useGetCategories();
  const {
    subCategories,
    loading: subCategoriesLoading,
    done: subCategoriesDone,
  } = useGetSubCategories();
  const {
    keywords,
    loading: keywordsLoading,
    done: keywordsDone,
  } = useGetKeywords();
  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      {categoriesLoading && subCategoriesLoading && keywordsLoading && (
        <LoadingCircle />
      )}
      {categoriesDone && subCategoriesDone && keywordsDone && (
        <>
          <div>{categories.length}</div>
          <div>{subCategories.length}</div>
          <div>{keywords.length}</div>
        </>
      )}
    </div>
  );
}
