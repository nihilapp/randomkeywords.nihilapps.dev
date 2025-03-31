'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
}

const cssVariants = cva(
  [
    `flex flex-row gap-5`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FormButtons({ styles, children, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      {children}
    </div>
  );
}
