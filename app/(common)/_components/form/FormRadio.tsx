'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn, tools } from '@/_libs';
import { FormRadioItem } from '@/(common)/_components/form/FormRadioItem';

interface RadioItem {
  label: string;
  value: string;
}

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  name: string;
  label: string;
  items: RadioItem[];
  errorMessage?: string;
  errorStyles?: string;
}

const cssVariants = cva(
  [
    `flex flex-col gap-2`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FormRadio({
  styles, name, label, items, errorMessage, errorStyles, ...props
}: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <span className='font-900'>{label}</span>
      <div
        className={cn(
          'grid grid-cols-2 mo-md:grid-cols-3 gap-2'
        )}
      >
        {items.map((item) => (
          <FormRadioItem
            key={tools.common.uuid()}
            name={name}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
      {errorMessage && (
        <span
          className={cn(
            '',
            errorStyles
          )}
        >{errorMessage}
        </span>
      )}
    </div>
  );
}
