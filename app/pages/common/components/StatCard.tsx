import { Icon } from '@iconify/react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '~/utils';

const statCardCva = cva(
  [
    'flex-1 shrink-0 flex flex-col gap-1 items-center justify-center p-2 rounded-2',
  ],
  {
    variants: {
      variant: {
        blue: 'bg-blue-100 text-blue-500',
        red: 'bg-red-100 text-red-500',
        green: 'bg-green-100 text-green-500',
        purple: 'bg-purple-100 text-purple-500',
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
    compoundVariants: [],
  }
);

interface StatCardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardCva> {
  icon: string;
  title: string;
  count: number;
}

export function StatCard({
  icon,
  title,
  count,
  variant,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(statCardCva({ variant, }), className)}
      {...props}
    >
      <div className='flex flex-row gap-1 items-center'>
        <Icon icon={icon} />
        <span>{title}</span>
      </div>
      <div>{count}개</div>
    </div>
  );
}
