// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '~/utils';

const radioItemCva = cva(
  [
    '',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface RadioItemProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof radioItemCva> {}

export function RadioItem({
  className,
  ...props
}: RadioItemProps) {
  return (
    <div
      className={cn(radioItemCva(), className)}
      {...props}
    >
      content
    </div>
  );
}
