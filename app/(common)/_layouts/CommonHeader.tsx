'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { Logo } from '@/(common)/_layouts/Logo';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants.default> {
  styles?: string;
}

const cssVariants = {
  default: cva(
    [
      ``,
    ],
    {
      variants: {},
      defaultVariants: {},
      compoundVariants: [],
    }
  ),
};

export function CommonHeader({ styles, ...props }: Props) {
  return (
    <header
      className={cn(
        cssVariants.default({}),
        styles
      )}
      {...props}
    >
      <Logo />
      header
    </header>
  );
}
