'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { menuData } from '@/_data';
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

export function CommonNav({ className, onLinkClick, ...props }: Props) {
  return (
    <nav
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <ul className='flex flex-col gap-2'>
        {menuData.map((menu) => (
          <li key={menu.href}>
            <MenuItem
              href={menu.href}
              icon={menu.icon}
              onLinkClick={onLinkClick}
            >
              {menu.label}
            </MenuItem>
          </li>
        ))}
      </ul>
    </nav>
  );
}
