'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
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

export function CommonNav({ styles, ...props }: Props) {
  return (
    <nav
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <ul>
        <li>
          <Link href='/'>홈</Link>
        </li>
      </ul>
    </nav>
  );
}
