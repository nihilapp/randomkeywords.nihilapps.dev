// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';
import type { IconType } from 'react-icons/lib';
import { TbLoaderQuarter } from 'react-icons/tb';
import { cn } from '~/utils';

const buttonCva = cva(
  [
    'rounded-2 p-2 flex flex-row gap-2 items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-black-600 text-white',
        danger: 'bg-red-500 text-white',
        secondary: 'bg-gray-200 text-gray-800',
        outline: 'border border-gray-300 bg-transparent text-gray-800',
      },
      size: {
        sm: 'text-sm py-1 px-2',
        md: 'text-md py-2 px-3',
        lg: 'text-lg py-3 px-4',
      },
      fullWidth: {
        true: 'w-full',
      },
      flexMode: {
        grow: 'flex-1',
        shrink: 'shrink-0',
        growShrink: 'flex-1 shrink-0',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      flexMode: 'none',
    },
    compoundVariants: [
      {
        variant: 'primary',
        className: 'hover:bg-black-base',
      },
      {
        variant: 'danger',
        className: 'hover:bg-red-700',
      },
    ],
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonCva> {
  isLoading?: boolean;
  icon?: IconType;
}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  flexMode,
  disabled,
  isLoading,
  icon: Icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonCva({
          variant, size, fullWidth, flexMode,
        }),
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <>
          <TbLoaderQuarter className='animate-spin' />
          <span>{children}</span>
        </>
      )}
      {!isLoading && Icon && (
        <>
          <Icon />
          <span>{children}</span>
        </>
      )}
      {!isLoading && !Icon && children}
    </button>
  );
}
