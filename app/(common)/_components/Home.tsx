'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { useGetTodos } from '@/_hooks/query';
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
  const { todos, loading, done, } = useGetTodos();

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
            {JSON.stringify(todos, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
