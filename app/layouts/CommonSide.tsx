// import { Outlet } from 'react-router';

import { Link } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '~/utils';
import { SideLogo } from './SideLogo';
import { FooterButton } from '~/layouts/FooterButton';

const navs = [
  {
    label: '홈',
    to: '/',
  },
];

const commonSideCva = cva(
  [
    `p-2 shrink-0`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface CommonSideProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof commonSideCva> {}

export function CommonSide({
  className,
  ...props
}: CommonSideProps) {
  return (
    <aside
      className={cn(commonSideCva(), className)}
      {...props}
    >
      <header>
        <SideLogo
          text='랜덤키워드'
        />
      </header>

      <ul>
        {navs.map((nav) => (
          <li key={nav.to}>
            <Link to={nav.to}>{nav.label}</Link>
          </li>
        ))}
      </ul>

      <footer>
        <FooterButton />
      </footer>
    </aside>
  );
}
