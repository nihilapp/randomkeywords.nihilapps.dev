'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLAnchorElement | HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  href?: string;
  name: string;
  length?: number;
  upperCategory?: string;
  mode?: 'link' | 'nolink';
}

const cssVariants = cva(
  [
    `flex flex-row justify-between p-2 rounded-2 border border-black-200`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ListItem({
  className,
  href,
  name,
  length,
  upperCategory,
  mode = 'link',
  ...props
}: Props) {
  const commonClassName = cn(
    cssVariants({}),
    className
  );

  const innerContent = (
    <>
      <div className='flex flex-col justify-center'>
        {upperCategory && <span className='text-xs text-gray-500'>{upperCategory}</span>}
        <span>
          {name}
        </span>
      </div>
      {length !== undefined && (
        <span
          className='text-sm bg-black-base text-white p-2 px-3 rounded-2 flex items-center justify-center'
        >
          {length}
        </span>
      )}
    </>
  );

  if (mode === 'link' && href) {
    return (
      <Link
        className={cn(
          commonClassName,
          `hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 ease-in-out`
        )}
        {...props}
        href={href}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <div
      className={commonClassName}
      {...props}
    >
      {innerContent}
    </div>
  );
}
