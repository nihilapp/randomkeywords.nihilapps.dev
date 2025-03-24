'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
}

const cssVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CmsFooter({ styles, ...props }: Props) {
  return (
    <footer
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      footer
    </footer>
  );
}
