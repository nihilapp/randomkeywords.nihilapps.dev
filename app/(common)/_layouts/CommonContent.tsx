'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useState, useEffect } from 'react';
import { MdMenu } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { cn } from '@/_libs';
import { CommonHeader } from '@/(common)/_layouts/CommonHeader';
import { CommonNav } from '@/(common)/_layouts/CommonNav';
import { CommonFooter } from '@/(common)/_layouts/CommonFooter';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  children: React.ReactNode;
}

const cssVariants = cva(
  [
    `flex flex-col mo-md:flex-row text-md text-black-base`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonContent({ children, className, ...props }: Props) {
  const [ isOpen, setIsOpen, ] = useState(false);
  const [ isMounted, setIsMounted, ] = useState(false);
  const [ isClientDesktop, setIsClientDesktop, ] = useState(false);

  const mediaQueryIsDesktop = useMediaQuery({ query: '(min-width: 768px)', });

  useEffect(() => {
    setIsMounted(true);
    setIsClientDesktop(mediaQueryIsDesktop);
  }, [ mediaQueryIsDesktop, ]);

  useEffect(() => {
    if (isMounted) {
      if (isClientDesktop) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [ isClientDesktop, isMounted, ]);

  const toggleSidebar = () => {
    if (!isMounted || isClientDesktop) return;
    setIsOpen((prevOpen) => !prevOpen);
  };

  const closeSidebar = () => {
    if (!isMounted || isClientDesktop) return;
    setIsOpen(false);
  };

  const asideClasses = cn(
    'fixed mo-md:static top-0 left-0 h-dvh mo-md:h-auto z-30 mo-md:z-auto',
    'order-2 mo-md:order-1 p-5 w-full mo-md:w-[350px] bg-black-700',
    'flex flex-col gap-5 shrink-0',
    'transition-transform duration-300 ease-in-out',
    'transform',
    (!isMounted || !isClientDesktop) && (isOpen ? 'translate-x-0' : '-translate-x-full'),
    'mo-md:transform-none'
  );

  const buttonClasses = cn(
    'mb-2 text-left fixed top-2 left-2 rounded-2 border z-40',
    'border-black-400 bg-white text-black-base',
    isMounted && !isClientDesktop ? 'block' : 'hidden'
  );

  return (
    <div
      className={cn(
        cssVariants({}),
        'h-dvh',
        'overflow-hidden',
        className
      )}
      {...props}
    >
      <aside
        id='side'
        className={asideClasses}
      >
        <CommonHeader />
        <CommonNav onLinkClick={closeSidebar} />
        <CommonFooter />
      </aside>
      <main
        id='main'
        className='order-1 mo-md:order-2 p-5 overflow-y-auto flex-grow mo-md:relative'
      >
        <div
          className={buttonClasses}
        >
          <button type='button' onClick={toggleSidebar} className='p-2 block cursor-pointer'>
            <MdMenu />
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
