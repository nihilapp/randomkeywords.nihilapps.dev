'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';
import { cn } from '@/_libs';

interface Props
  extends React.FormHTMLAttributes<HTMLFormElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
}

const cssVariants = cva(
  [
    `flex flex-col gap-5`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FormContainer({
  styles, form, onSubmit, children, ...props
}: Props) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          cssVariants({}),
          styles
        )}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}
