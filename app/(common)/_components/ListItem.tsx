'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  href: string;
  name: string;
  length: number;
}

const cssVariants = cva(
  [
    `flex flex-row items-center justify-between p-2 rounded-2 border border-black-100 hover:bg-black-100`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ListItem({
  styles, href, name, length, ...props
}: Props) {
  return (
    <Link
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
      href={href}
    >
      <span>
        {name}
      </span>
      <span
        className='text-sm bg-black-base text-white p-1 px-3 rounded-2'
      >
        {length}
      </span>
    </Link>
  );
}
