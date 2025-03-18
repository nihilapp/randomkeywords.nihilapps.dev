// import { Outlet } from 'react-router';

import { Link } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '~/utils';

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
      <header>header</header>

      <ul>
        {navs.map((nav) => (
          <li key={nav.to}>
            <Link to={nav.to}>{nav.label}</Link>
          </li>
        ))}
      </ul>

      <footer>
        <Link to='/cms'>
          <Icon icon='mdi:cog' />
          <span>CMS로 가기</span>
        </Link>
      </footer>
    </aside>
  );
}
