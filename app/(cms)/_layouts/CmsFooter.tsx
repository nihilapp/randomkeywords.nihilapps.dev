'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import { MdHome } from 'react-icons/md';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
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

export function CmsFooter({ className, ...props }: Props) {
  return (
    <footer
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <Link href='/' className='flex flex-row gap-1 items-center justify-center text-white p-2 border border-black-0 rounded-2 hover:bg-white hover:text-black-base transition-colors duration-200 ease-in-out'>
        <MdHome />
        <span>홈으로</span>
      </Link>
    </footer>
  );
}
