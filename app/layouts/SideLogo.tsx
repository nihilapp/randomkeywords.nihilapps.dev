// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { Link } from 'react-router';
import { siteConfig } from '~/config';
import { cn } from '~/utils';

const sideLogoCva = cva(
  [
    'block mb-5',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface SideLogoProps extends HTMLAttributes<HTMLAnchorElement>, VariantProps<typeof sideLogoCva> {
  text: string;
  isCms?: boolean;
}

export function SideLogo({
  className,
  text,
  isCms = false,
  ...props
}: SideLogoProps) {
  return (
    <Link
      to={isCms ? '/cms' : '/'}
      className={cn(sideLogoCva(), className)}
      {...props}
    >
      <h1 className='flex flex-row gap-2 items-center justify-center'>
        <img
          src={siteConfig.darkLogo}
          alt={`${siteConfig.title} logo`}
          className='w-10 h-10 block'
        />
        <span className='text-h3 font-900'>{text}</span>
      </h1>
    </Link>
  );
}
