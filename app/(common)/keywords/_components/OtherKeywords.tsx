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

export function OtherKeywords({ styles, ...props }: Props) {
  const {
    json,
    loading,
    done,
  } = useGetOtherJson();

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
        <div className='grid grid-cols-2 gap-2 mo-md:grid-cols-3'>
          {Object.entries(json).map(([ subCategoryName, keywords, ]) => (
            <RandomButton
              key={subCategoryName}
              name={subCategoryName}
              length={keywords.length}
              keywords={keywords}
            />
          ))}
        </div>
      )}
    </div>
  );
}
