'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { CmsNav } from '@/(cms)/_layouts/CmsNav';
import { CmsHeader } from '@/(cms)/_layouts/CmsHeader';
import { CmsFooter } from '@/(cms)/_layouts/CmsFooter';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
}

const cssVariants = cva(
  [
    `flex flex-col mo-md:flex-row text-md text-black-base`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CmsContent({ children, styles, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <aside
        className='order-2 mo-md:order-1 p-5 w-full mo-md:w-[350px] bg-black-700 mo-md:overflow-y-auto flex flex-col gap-5 shrink-0'
      >
        <CmsHeader />
        <CmsNav />
        <CmsFooter />
      </aside>
      <main
        className='order-1 mo-md:order-2 p-5 dvh-100 mo-md:overflow-y-auto mo-md:w-full'
      >
        {children}
      </main>
    </div>
  );
}
