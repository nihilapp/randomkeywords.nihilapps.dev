'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/_libs';

interface Props
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
  VariantProps<typeof labelCva> {
  className?: string;
  name: string;
  label: string;
  errorMessage?: string;
  type?: string;
}

const labelCva = cva(
  [
    `flex flex-col gap-2`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FormText({
  className, name, label, errorMessage, type = 'text', ...props
}: Props) {
  const { register, formState: { touchedFields, }, } = useFormContext();

  const valid = useMemo(
    () => {
      // 에러메시지가 있을 때.
      // 에러메시지가 있고 터치되어있을 때.
      // 에러메시지가 있지만 터치되어있지 않을 때.
      if (errorMessage && touchedFields[name]) {
        return false;
      } else if (errorMessage) {
        return false;
      }

      return true;
    },
    [ errorMessage, touchedFields, name, ]
  );

  return (
    <label
      className={cn(
        labelCva({}),
        className
      )}
      {...props}
    >
      <span className='font-900'>{label}</span>
      <input
        id={name}
        type={type}
        className={cn(
          'border border-black-200 rounded-2 p-2',
          valid ? 'border-blue-500' : 'border-red-500'
        )}
        {...register(name)}
      />
      {errorMessage && (
        <span
          className={cn(
            'text-red-500 italic font-900'
          )}
        >
          {errorMessage}
        </span>
      )}
    </label>
  );
}
