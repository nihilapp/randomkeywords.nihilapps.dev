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
  length?: number;
  upperCategory?: string;
}

const cssVariants = cva(
  [
    `flex flex-row justify-between p-2 rounded-2 border border-black-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 ease-in-out`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ListItem({
  styles, href, name, length, upperCategory, ...props
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
      <div className='flex flex-col items-start'>
        <span className='text-xs text-gray-500'>{upperCategory}</span>
        <span>
          {name}
        </span>
      </div>
      {length && (
        <span
          className='text-sm bg-black-base text-white p-2 px-3 rounded-2 flex items-center justify-center'
        >
          {length || ''}
        </span>
      )}
    </Link>
  );
}
