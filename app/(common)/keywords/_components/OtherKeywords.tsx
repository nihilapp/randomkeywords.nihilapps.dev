'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { LoadingCircle } from '@/(common)/_components';
import { RandomButton } from '@/(common)/keywords/_components/RandomButton';
import { useGetOtherJson } from '@/_hooks/query/json';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `grid grid-cols-2 gap-2 mo-md:grid-cols-3`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function OtherKeywords({ className, ...props }: Props) {
  const {
    json,
    loading,
    done,
  } = useGetOtherJson();

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {loading && (
        <LoadingCircle className='col-span-3' />
      )}
      {done && (
        Object.entries(json).map(([ subCategoryName, keywords, ]) => (
          <RandomButton
            key={subCategoryName}
            name={subCategoryName}
            length={keywords.length}
            keywords={keywords}
          />
        ))
      )}
    </div>
  );
}
