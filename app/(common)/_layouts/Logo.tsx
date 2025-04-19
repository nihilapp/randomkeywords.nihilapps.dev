'use client';

import {
  cva,
  type VariantProps
} from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/_libs';
import { siteConfig } from '@/_config';

interface Props
  extends React.HTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  href?: string;
  title?: string;
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

export function Logo({
  href = '/',
  className,
  title = `${siteConfig.title}`,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <h1 className='flex flex-row items-center justify-center gap-2'>
        <Image
          src={siteConfig.darkLogo}
          alt='nihilapps logo'
          width={100}
          height={100}
          className='w-[40px] h-[40px] block'
        />
        <span className='font-900 text-h3 text-white'>
          {title}
        </span>
      </h1>
    </Link>
  );
}
