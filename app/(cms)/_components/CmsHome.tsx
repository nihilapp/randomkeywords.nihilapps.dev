'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { MdFolder, MdOutlineFolder, MdSell } from 'react-icons/md';
import { cn } from '@/_libs';
import { useGetCategories } from '@/_hooks/query/categories';
import { useGetSubCategories } from '@/_hooks/query/sub_categories';
import { useGetKeywords } from '@/_hooks/query/keywords';
import { LoadingCircle } from '@/(common)/_components';
import { CountCard } from '@/(cms)/_components/CountCard';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `flex flex-col mo-md:flex-row gap-2`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CmsHome({ className, ...props }: Props) {
  const {
    categories,
    loading: categoriesLoading,
    done: categoriesDone,
  } = useGetCategories();

  const {
    loading: subCategoriesLoading,
    done: subCategoriesDone,
    totalCount: subCategoriesTotalCount,
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
        className
      )}
      {...props}
    >
      {categoriesLoading && (
        <LoadingCircle />
      )}
      {categoriesDone && (
        <CountCard
          name='카테고리'
          count={categories.length}
          icon={MdFolder}
          className='bg-blue-100 text-blue-500 border-blue-200'
        />
      )}

      {subCategoriesLoading && (
        <LoadingCircle />
      )}
      {subCategoriesDone && (
        <CountCard
          name='서브 카테고리'
          count={subCategoriesTotalCount}
          icon={MdOutlineFolder}
          className='bg-green-100 text-green-600 border-green-200'
        />
      )}

      {keywordsLoading && (
        <LoadingCircle />
      )}
      {keywordsDone && (
        <CountCard
          name='키워드'
          count={keywords.length}
          icon={MdSell}
          className='bg-red-100 text-red-500 border-red-200'
        />
      )}
    </div>
  );
}
