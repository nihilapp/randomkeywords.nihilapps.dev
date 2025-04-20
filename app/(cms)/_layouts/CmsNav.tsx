'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import {
  MdFolder, MdOutlineFolder, MdSell,
  MdSettings
} from 'react-icons/md';
import { cn } from '@/_libs';
import { MenuItem } from '@/(common)/_components';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  onLinkClick?: () => void;
}

const cssVariants = cva(
  [
    `flex-1 shrink-0`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CmsNav({ className, onLinkClick, ...props }: Props) {
  return (
    <nav
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <ul className='flex flex-col gap-2'>
        <li>
          <MenuItem
            href='/cms'
            icon={MdSettings}
            onLinkClick={onLinkClick}
          >
            CMS 홈
          </MenuItem>
        </li>
        <li>
          <MenuItem
            href='/cms/categories'
            icon={MdFolder}
            onLinkClick={onLinkClick}
          >
            카테고리 관리
          </MenuItem>
        </li>
        <li>
          <MenuItem
            href='/cms/sub_categories'
            icon={MdOutlineFolder}
            onLinkClick={onLinkClick}
          >
            서브 카테고리 관리
          </MenuItem>
        </li>
        <li>
          <MenuItem
            href='/cms/keywords'
            icon={MdSell}
            onLinkClick={onLinkClick}
          >
            키워드 관리
          </MenuItem>
        </li>
      </ul>
    </nav>
  );
}
