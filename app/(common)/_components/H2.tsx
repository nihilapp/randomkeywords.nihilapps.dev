'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
}

const cssVariants = cva(
  [
    `text-h3 font-900 border-l-[30px] pl-2`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function H2({ styles, children, ...props }: Props) {
  return (
    <h2
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
