import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { CmsSide } from './CmsSide';
import { cn } from '~/utils';

const cmsLayoutCva = cva(
  [
    'flex flex-row font-500 text-md text-black-base',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface CmsLayoutProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cmsLayoutCva> {}

export function CmsLayout({
  className,
  ...props
}: CmsLayoutProps) {
  return (
    <>
      <div
        className={cn(cmsLayoutCva(), className)}
        {...props}
      >
        <CmsSide />
        <main className='p-2 flex-1 shrink-0 min-h-0'>
          <Outlet />
        </main>
      </div>
    </>
  );
}
