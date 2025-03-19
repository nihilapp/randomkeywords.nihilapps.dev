// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { Link } from 'react-router';
import { cn } from '~/utils';
import type { ExCategory } from '../types';

const categoryListCva = cva(
  [
    'grid grid-cols-2 mo-md:grid-cols-3 gap-2',
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
        <Link
          key={category.id}
          to={`/cms/categories/${category.id}`}
          className='p-2 border border-black-200 rounded-2 bg-black-50 hover:bg-black-100 transition-colors duration-200 ease-in-out flex flex-row items-center justify-between'
        >
          <span>{category.name}</span>
          <span
            className='p-1 px-3 text-white bg-black-base rounded-2'
          >
            {category.sub_categories.length}
          </span>
        </Link>
      ))}
    </div>
  );
}
