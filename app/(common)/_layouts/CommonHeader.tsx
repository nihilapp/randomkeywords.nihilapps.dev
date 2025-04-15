'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { Logo } from '@/(common)/_layouts/Logo';
import { siteConfig } from '@/_config';

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

export function CommonHeader({ styles, ...props }: Props) {
  return (
    <header
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <Logo
        href='/'
        title={siteConfig.title}
      />
    </header>
  );
}
