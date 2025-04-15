'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { useKeywordStore } from '@/_entities/keywords';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  mode?: 'single' | 'multiple';
}

const cssVariants = cva(
  [
    `text-center font-900 text-h3`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function SelectedKeyword({ styles, mode = 'single', ...props }: Props) {
  const { selectedKeyword, selected5Keywords, subCategory, } = useKeywordStore();

  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      {mode === 'single' && (
        <p className='flex flex-col gap-1 items-center justify-center'>
          <span className='text-md text-black-500 font-500'>{subCategory}</span>
          <span>{selectedKeyword}</span>
        </p>
      )}
      {mode === 'multiple' && (
        <p className='flex flex-col gap-1 items-center justify-center'>
          <span className='text-md text-black-500 font-500'>{subCategory}</span>
          {selected5Keywords.map((keyword) => (
            <span key={keyword}>
              {keyword}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
