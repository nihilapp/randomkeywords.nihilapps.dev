// import { Outlet } from 'react-router';

import { Link } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { MdFolder, MdLocalOffer, MdOutlineFolder } from 'react-icons/md';
import { cn } from '~/utils';
import { SideLogo } from './SideLogo';
import { FooterButton } from '~/layouts/FooterButton';

const navs = [
  {
    label: '카테고리 관리',
    to: '/cms/categories',
    icon: <MdFolder />,
  },
  {
    label: '서브 카테고리 관리',
    to: '/cms/sub-categories',
    icon: <MdOutlineFolder />,
  },
  {
    label: '키워드 관리',
    to: '/cms/keywords',
    icon: <MdLocalOffer />,
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
        <ul className='flex flex-col gap-2'>
          {navs.map((nav) => (
            <li key={nav.to}>
              <Link to={nav.to} className='flex flex-row gap-2 items-center p-2 px-3 rounded-2 bg-black-800 border border-black-900 hover:bg-white hover:border-white hover:text-black-base transition-colors duration-200 ease-in-out'>
                {nav.icon}
                {nav.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer>
        <FooterButton
          isCms
        />
      </footer>
    </aside>
  );
}
