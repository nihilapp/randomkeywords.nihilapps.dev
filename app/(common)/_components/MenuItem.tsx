'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import type { IconType } from 'react-icons';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  href: string;
  icon: IconType;
  onLinkClick?: () => void;
}

const cssVariants = cva(
  [
    `flex flex-row gap-2 items-center text-white border border-black-600 rounded-2 p-2 hover:bg-black-900 hover:text-white transition-colors duration-200 ease-in-out hover:border-black-900`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function MenuItem({
  className,
  children,
  href,
  icon: Icon,
  onLinkClick,
  ...props
}: Props) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onLinkClick) {
      onLinkClick();
    }
    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <Link
      href={href}
      className={cn(
        cssVariants({}),
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <Icon />
      <span>{children}</span>
    </Link>
  );
}
