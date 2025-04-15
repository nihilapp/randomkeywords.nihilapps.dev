'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useEffect, useState } from 'react';
import { cn } from '@/_libs';
import { useGetCategoryByName } from '@/_hooks/query/categories';
import { useGetSubCategoriesByCategoryId } from '@/_hooks/query/sub_categories';
import { LoadingCircle } from '@/(common)/_components';
import { RandomButton } from '@/(common)/keywords/_components/RandomButton';

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

export function CharacterKeywords({ styles, ...props }: Props) {
  const [ categoryId, setCategoryId, ] = useState('');

  const { category, loading, done, } = useGetCategoryByName('캐릭터 관련');
  const { subCategories, loading: subCategoriesLoading, done: subCategoriesDone, } = useGetSubCategoriesByCategoryId(categoryId);

  useEffect(() => {
    if (done) {
      setCategoryId(category.id);
    }
  }, [ done, category, ]);

  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      {loading && subCategoriesLoading && (
        <LoadingCircle />
      )}
      {done && subCategoriesDone && (
        <div className='grid grid-cols-2 gap-2 mo-md:grid-cols-3'>
          {subCategories.map((subCategory) => (
            <RandomButton
              key={subCategory.id}
              name={subCategory.name}
              length={subCategory._count.keyword}
              subCategoryId={subCategory.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
