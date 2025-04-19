'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  name: string;
  content: string;
  suffix?: string;
}

const cssVariants = cva(
  [
    `flex flex-row gap-2 items-center`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function InfoBlock({
  className, name, content, suffix, ...props
}: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <span className='font-900 p-2 bg-black-200 rounded-2 w-[200px] text-center'>
        {name}
      </span>
      <span className='p-2 border border-black-200 rounded-2 flex-1 shrink-0'>
        {content}{suffix}
      </span>
    </div>
  );
}
