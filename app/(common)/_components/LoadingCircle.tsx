'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
}

const cssVariants = cva(
  [
    `flex flex-col gap-1 items-center justify-center p-2 rounded-2 bg-black-50`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function LoadingCircle({ styles, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <AiOutlineLoading3Quarters className='animate-spin text-[250%]' />
      <span className='text-lg font-900'>데이터 로딩중...</span>
    </div>
  );
}
