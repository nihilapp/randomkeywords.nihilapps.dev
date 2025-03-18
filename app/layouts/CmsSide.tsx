// import { Outlet } from 'react-router';

import { Link } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '~/utils';

const navs = [
  {
    label: '카테고리 관리',
    to: '/cms/categories',
  },
  {
    label: '서브 카테고리 관리',
    to: '/cms/sub-categories',
  },
  {
    label: '키워드 관리',
    to: '/cms/keywords',
  },
];

const cmsSideCva = cva(
  [
    'p-2 shrink-0',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface CmsSideProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof cmsSideCva> {}

export function CmsSide({
  className,
  ...props
}: CmsSideProps) {
  return (
    <aside
      className={cn(cmsSideCva(), className)}
      {...props}
    >
      <header>header</header>

      <nav>
        <ul>
          {navs.map((nav) => (
            <li key={nav.to}>
              <Link to={nav.to}>{nav.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer>
        <Link to='/'>
          <Icon icon='mdi:home' />
          <span>홈으로 가기</span>
        </Link>
      </footer>
    </aside>
  );
}
