// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { MdHome, MdSettings } from 'react-icons/md';
import { Link } from 'react-router';
import { cn } from '~/utils';

const footerButtonCva = cva(
  [
    'flex flex-row gap-2 items-center justify-center text-lg p-2 border border-white hover:bg-white hover:text-black-base transition-colors duration-200 ease-in-out',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface FooterButtonProps extends HTMLAttributes<HTMLAnchorElement>, VariantProps<typeof footerButtonCva> {
  isCms?: boolean;
}

export function FooterButton({
  className,
  isCms = false,
  ...props
}: FooterButtonProps) {
  return (
    <Link
      to={!isCms ? '/cms' : '/'}
      className={cn(footerButtonCva(), className)}
      {...props}
    >
      {!isCms ? <MdSettings /> : <MdHome />}
      <span>{!isCms ? 'CMS로 가기' : '홈으로 가기'}</span>
    </Link>
  );
}
