'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
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

export function CmsNav({ styles, ...props }: Props) {
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
          <Link href='/cms'>CMS 홈</Link>
        </li>
        <li>
          <Link href='/cms/categories'>카테고리 관리</Link>
        </li>
        <li>
          <Link href='/cms/sub_categories'>서브 카테고리 관리</Link>
        </li>
        <li>
          <Link href='/cms/keywords'>키워드 관리</Link>
        </li>
      </ul>
    </nav>
  );
}
