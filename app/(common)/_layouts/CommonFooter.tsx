'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import { MdSettings } from 'react-icons/md';
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

export function CommonFooter({ className, ...props }: Props) {
  return (
    <footer
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {process.env.NODE_ENV === 'development' && (
        <Link href='/cms' className='flex flex-row gap-1 items-center justify-center text-white p-2 border border-black-0 rounded-2 hover:bg-white hover:text-black-base transition-colors duration-200 ease-in-out'>
          <MdSettings />
          <span>CMS 홈으로</span>
        </Link>
      )}
    </footer>
  );
}
