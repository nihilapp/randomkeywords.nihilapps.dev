import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { CommonSide } from './CommonSide';
import { cn } from '~/utils';

const commonLayoutCva = cva(
  [
    'flex flex-row font-500 text-md text-black-base',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface CommonLayoutProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof commonLayoutCva> {}

export function CommonLayout({
  className,
  children,
  ...props
}: CommonLayoutProps) {
  return (
    <div
      className={cn(commonLayoutCva(), className)}
      {...props}
    >
      <CommonSide />
      <main className='p-2 flex-1 shrink-0 min-h-0'>
        {children}
      </main>
    </div>
  );
}
