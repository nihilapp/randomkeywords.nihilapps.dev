'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants.default> {
  styles?: string;
}

const cssVariants = {
  default: cva(
    [
      `flex flex-col gap-1 items-center justify-center`,
    ],
    {
      variants: {},
      defaultVariants: {},
      compoundVariants: [],
    }
  ),
};

export function LoadingCircle({ styles, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants.default({}),
        styles
      )}
      {...props}
    >
      <AiOutlineLoading3Quarters className='animate-spin text-[250%]' />
      <span>데이터 로딩중...</span>
    </div>
  );
}
