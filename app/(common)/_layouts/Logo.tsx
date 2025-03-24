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
  styles?: string;
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
  styles,
  title = `${siteConfig.title}`,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <h1 className='flex flex-row items-center justify-center gap-2'>
        <Image
          src={siteConfig.darkLogo}
          alt='nihilapps logo'
          width={100}
          height={100}
          className='w-[40px] w-[40px] block'
        />
        <span className='text-white text-h3'>
          {title}
        </span>
      </h1>
    </Link>
  );
}
