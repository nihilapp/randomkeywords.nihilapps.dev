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
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
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

export function CmsNav({ styles, ...props }: Props) {
  return (
    <nav
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <ul className='flex flex-col gap-2'>
        <li>
          <MenuItem
            href='/cms'
            icon={MdSettings}
          >
            CMS 홈
          </MenuItem>
        </li>
        <li>
          <MenuItem
            href='/cms/categories'
            icon={MdFolder}
          >
            카테고리 관리
          </MenuItem>
        </li>
        <li>
          <MenuItem
            href='/cms/sub_categories'
            icon={MdOutlineFolder}
          >
            서브 카테고리 관리
          </MenuItem>
        </li>
        <li>
          <MenuItem
            href='/cms/keywords'
            icon={MdSell}
          >
            키워드 관리
          </MenuItem>
        </li>
      </ul>
    </nav>
  );
}
