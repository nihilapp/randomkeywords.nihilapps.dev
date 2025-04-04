'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  title: string;
  defaultOpen?: boolean;
}

const cssVariants = cva(
  [
    `flex flex-col w-full border border-black-200 p-2 gap-2 rounded-2`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function ToggleBlock({
  styles, title, children, defaultOpen = true, ...props
}: Props) {
  const [ isOpen, setIsOpen, ] = useState(
    defaultOpen
  );

  const onClickOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <div
        className='flex flex-row items-center justify-between p-2 cursor-pointer bg-black-100 rounded-2 select-none hover:bg-black-base hover:text-white'
        onClick={onClickOpen}
      >
        <h2 className='text-lg font-900'>
          {title}
        </h2>
        <MdOutlineKeyboardArrowUp
          className={cn(
            'size-[30px]',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </div>
      {isOpen && (
        <div className='p-2 border border-black-200 rounded-2'>{children}</div>
      )}
    </div>
  );
}
