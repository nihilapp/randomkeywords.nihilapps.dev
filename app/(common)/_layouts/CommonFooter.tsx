'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';

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

export function CommonFooter({ styles, ...props }: Props) {
  return (
    <footer
      className={cn(
        cssVariants.default({}),
        styles
      )}
      {...props}
    >
      footer
    </footer>
  );
}
