'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLLabelElement>,
  VariantProps<typeof cssVariants> {
  inputStyles?: string;
  labelStyles?: string;
  name: string;
  label: string;
  value: string;
}

const cssVariants = cva(
  [
    `flex flex-row gap-1 items-center justify-center p-2 rounded-2 bg-black-50 border border-black-200 flex-1 shrink-0 cursor-pointer`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FormRadioItem({
  inputStyles, labelStyles, name, label, value, ...props
}: Props) {
  const { register, watch, } = useFormContext();
  const isChecked = watch(name) === value;

  return (
    <label
      className={cn(
        cssVariants({}),
        isChecked ? 'border-blue-500' : '',
        labelStyles
      )}
      {...props}
    >
      <input
        type='radio'
        id={`${name}-${value}`}
        value={value}
        className={cn(
          'hidden',
          inputStyles
        )}
        {...register(name)}
      />
      {isChecked ? (
        <MdOutlineRadioButtonChecked className='text-blue-500' size={24} />
      ) : (
        <MdOutlineRadioButtonUnchecked size={24} />
      )}
      <span
        className={cn(
          '',
          isChecked ? 'text-blue-500' : ''
        )}
      >
        {label}
      </span>
    </label>
  );
}
