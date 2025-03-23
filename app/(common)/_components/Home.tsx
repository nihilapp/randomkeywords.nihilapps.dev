'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { useGetCategories } from '@/_hooks/query/categories';
import { LoadingCircle } from '@/(common)/_components/LoadingCircle';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants.default> {
  styles?: string;
}

const cssVariants = {
  default: cva(
    [
      ``,
    ],
    {
      variants: {},
      defaultVariants: {},
      compoundVariants: [],
    }
  ),
};

export function Home({ styles, ...props }: Props) {
  const { categories, loading, done, } = useGetCategories();

  return (
    <div
      className={cn(
        cssVariants.default({}),
        styles
      )}
      {...props}
    >
      {loading && (
        <LoadingCircle />
      )}
      {done && (
        <div>
          <pre>
            {JSON.stringify(categories, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
