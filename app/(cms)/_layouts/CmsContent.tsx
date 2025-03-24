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
    `flex flex-col mo-md:flex-row`,
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
      <aside className='order-2 mo-md:order-1 p-2 w-full mo-md:w-[350px] bg-black-700 mo-md:overflow-y-auto'>
        <CmsHeader />
        <CmsNav />
        <CmsFooter />
      </aside>
      <main className='order-1 mo-md:order-2 p-2 dvh-100 mo-md:overflow-y-auto'>
        {children}
      </main>
    </div>
  );
}
