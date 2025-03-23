'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/_libs';
import { commonStore } from '@/_entities';
import { siteConfig } from '@/_config';

interface Props
  extends React.HTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof cssVariants.default> {
  styles?: string;
  href?: string;
}

const cssVariants = {
  default: cva(
    [
      ``,
    ],
    {
      variants: {},
      defaultVariants: {},
      compoundVariants: [],
    }
  ),
};

export function Logo({
  href = '/',
  styles,
  ...props
}: Props) {
  const { isDarkMode, } = commonStore();

  return (
    <Link
      href={href}
      className={cn(
        cssVariants.default({}),
        styles
      )}
      {...props}
    >
      <Image
        src={
          isDarkMode
            ? siteConfig.darkLogo
            : siteConfig.logo
        }
        alt='nihilapps logo'
        width={100}
        height={100}
        className='w-[50px] w-[50px]'
      />
    </Link>
  );
}
