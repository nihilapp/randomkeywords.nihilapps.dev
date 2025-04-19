'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useState, memo } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  title: string;
  defaultOpen?: boolean;
}

const cssVariants = cva(
  [
    `flex flex-col w-full border border-black-400 p-3 gap-5 rounded-2`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

function ToggleBlockComponent({
  className, title, children, defaultOpen = true, ...props
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
        className
      )}
      {...props}
    >
      <div
        className='flex flex-row items-center justify-between p-2 cursor-pointer bg-black-200 rounded-2 select-none hover:bg-black-base hover:text-white transition-colors duration-200 ease-in-out'
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
        <div className=''>{children}</div>
      )}
    </div>
  );
}

export const ToggleBlock = memo(ToggleBlockComponent);
