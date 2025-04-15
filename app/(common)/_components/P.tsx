'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  className?: string;
}

const cssVariants = cva(
  [
    `text-justify border border-black-200 p-2 rounded-2`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function P({
  styles, children, className, ...props
}: Props) {
  return (
    <p
      className={cn(
        cssVariants({}),
        styles,
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
