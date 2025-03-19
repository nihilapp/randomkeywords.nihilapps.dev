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
  children,
  ...props
}: CmsLayoutProps) {
  return (
    <div
      className={cn(cmsLayoutCva(), className)}
      {...props}
    >
      <CmsSide />
      <main className='p-5 flex-1 flex flex-col gap-5 shrink-0 min-h-0 bg-black-50 dvh-100 overflow-y-auto'>
        {children}
      </main>
    </div>
  );
}
