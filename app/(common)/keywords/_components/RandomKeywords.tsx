'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import {
  cn, getAllKeywords
} from '@/_libs';
import { RandomButton } from '@/(common)/keywords/_components/RandomButton';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
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

export function RandomKeywords({ styles, ...props }: Props) {
  const { keywords, length, backgroundKeywords, } = getAllKeywords();

  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <RandomButton
        name='랜덤 키워드'
        mode='multiple'
        count={1}
        keywords={keywords}
        length={length}
        backgroundKeywords={backgroundKeywords}
      />

      <RandomButton
        name='랜덤 키워드 5개'
        mode='multiple'
        count={5}
        keywords={keywords}
        length={length}
        backgroundKeywords={backgroundKeywords}
      />

      <RandomButton
        name='랜덤 키워드 10개'
        mode='multiple'
        count={10}
        keywords={keywords}
        length={length}
        backgroundKeywords={backgroundKeywords}
      />

      <RandomButton
        name='랜덤 키워드 50개'
        mode='multiple'
        count={50}
        keywords={keywords}
        length={length}
        backgroundKeywords={backgroundKeywords}
      />

      <RandomButton
        name='랜덤 키워드 100개'
        mode='multiple'
        count={100}
        keywords={keywords}
        length={length}
        backgroundKeywords={backgroundKeywords}
      />
    </div>
  );
}
