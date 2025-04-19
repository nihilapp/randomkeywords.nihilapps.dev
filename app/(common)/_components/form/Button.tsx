'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  onClick?: () => void;
}

const cssVariants = cva(
  [
    `p-2 rounded-2 flex-1 cursor-pointer transition-colors duration-200 ease-in-out`,
  ],
  {
    variants: {
      variant: {
        blue: 'bg-blue-500 text-white hover:bg-blue-600',
        green: 'bg-green-500 text-white hover:bg-green-600',
        red: 'bg-red-500 text-white hover:bg-red-600',
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
    compoundVariants: [],
  }
);

export function Button({
  className, variant, children, onClick, ...props
}: Props) {
  return (
    <button
      className={cn(
        cssVariants({ variant, }),
        className
      )}
      {...props}
      onClick={onClick || (() => {})}
    >
      {children}
    </button>
  );
}
