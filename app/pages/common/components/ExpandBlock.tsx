// import { Outlet } from 'react-router';

import { cva, type VariantProps } from 'class-variance-authority';
import { useState, type HTMLAttributes } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useExpandAnimation } from '~/hooks';
import { cn } from '~/utils';

const expandBlockCva = cva(
  [
    'relative',
  ],
  {
    variants: {},
    defaultVariants: {
      isOpen: false,
    },
    compoundVariants: [],
  }
);

const titleCva = cva(
  [
    'p-5 flex items-center justify-between rounded-t-2 cursor-pointer select-none relative z-10 border border-black-200 bg-white font-900 text-lg',
  ],
  {
    variants: {
      isOpen: {
        true: 'rounded-b-none',
        false: 'rounded-b-2',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
    compoundVariants: [],
  }
);

interface ExpandBlockProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof expandBlockCva> {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function ExpandBlock({
  className,
  title,
  children,
  defaultOpen = true,
  ...props
}: ExpandBlockProps) {
  const [ isOpen, setIsOpen, ] = useState(defaultOpen);
  const { contentRef, heightStyle, } = useExpandAnimation({ isOpen, defaultOpen, });

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(
        expandBlockCva(),
        className
      )}
      {...props}
    >
      <h2
        className={cn(
          titleCva({ isOpen, })
        )}
        onClick={onClick}
      >
        <span>{title}</span>
        <MdKeyboardArrowUp
          className={cn([
            'text-[150%] transition-transform duration-200 ease-in-out',
            isOpen && 'rotate-180',
          ])}
        />
      </h2>
      <div
        className={cn([
          'open-animation-box',
          isOpen && 'border border-black-200 border-t-0 rounded-b-2',
        ])}
        style={heightStyle}
      >
        <div
          ref={contentRef}
          className={cn([
            'p-5 bg-white',
            isOpen ? 'animation-open' : 'animation-close',
          ])}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
