'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  children: React.ReactNode;
}

const cssVariants = cva(
  [
    `text-black-base`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonContent({ children, styles, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <aside>aside</aside>
      <main>{children}</main>
    </div>
  );
}
