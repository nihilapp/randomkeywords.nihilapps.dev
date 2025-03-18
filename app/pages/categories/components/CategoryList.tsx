// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '~/utils';
import type { ExCategory } from '../types';

const categoryListCva = cva(
  [
    '',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface CategoryListProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof categoryListCva> {
  categories: ExCategory[];
}

export function CategoryList({
  className,
  categories,
  ...props
}: CategoryListProps) {
  return (
    <div
      className={cn(categoryListCva(), className)}
      {...props}
    >
      {categories.map((category) => (
        <div key={category.id}>
          {category.name}
        </div>
      ))}
    </div>
  );
}
