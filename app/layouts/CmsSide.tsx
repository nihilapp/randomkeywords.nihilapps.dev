// import { Outlet } from 'react-router';

import { Link } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '~/utils';
import { SideLogo } from './SideLogo';
import { FooterButton } from '~/layouts/FooterButton';

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
    'p-5 shrink-0 bg-black-base text-white w-[350px] dvh-100 overflow-y-auto flex flex-col gap-5',
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
      <header>
        <SideLogo
          text='랜덤키워드 CMS'
          isCms
        />
      </header>

      <nav className='flex-1 shrink-0'>
        <ul>
          {navs.map((nav) => (
            <li key={nav.to}>
              <Link to={nav.to}>{nav.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className='mt-auto'>
        <FooterButton
          isCms
        />
      </footer>
    </aside>
  );
}
