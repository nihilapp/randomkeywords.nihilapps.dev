'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn, tools } from '@/_libs';
import { useGetCategories } from '@/_hooks/query/categories';
import { ListItem, LoadingCircle } from '@/(common)/_components';

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

export function CategoryList({ styles, ...props }: Props) {
  const {
    categories,
    loading,
    done,
  } = useGetCategories();

  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      {loading && (
        <LoadingCircle />
      )}
      {done && (
        <>
          {categories.length === 0 && (
            <div className='text-center text-h3 font-900'>
              카테고리가 없습니다.
            </div>
          )}
          {categories.length > 0 && (
            <div className='grid grid-cols-2 mo-md:grid-cols-3 gap-2'>
              {categories.map((item) => (
                <ListItem
                  key={tools.common.uuid()}
                  href={`/cms/categories/${item.id}`}
                  name={item.name}
                  length={item.SubCategory.length || 0}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
