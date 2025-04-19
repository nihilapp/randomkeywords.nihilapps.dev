'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import type { IconType } from 'react-icons';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  name: '카테고리' | '서브 카테고리' | '키워드';
  count: number;
  icon: IconType;
}

const cssVariants = cva(
  [
    `flex-1 shrink-0 p-2 rounded-2 border text-h5! font-900`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CountCard({
  className, name, count, icon: Icon, ...props
}: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <div className='flex flex-row items-center justify-center gap-2'>
        <Icon />
        <span>{name}</span>
      </div>
      <div className='text-center'>
        {count} 개
      </div>
    </div>
  );
}
