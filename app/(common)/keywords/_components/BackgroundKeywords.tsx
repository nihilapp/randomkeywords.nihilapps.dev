'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { LoadingCircle } from '@/(common)/_components';
import { RandomButton } from '@/(common)/keywords/_components/RandomButton';
import { useGetBackgroundJson } from '@/_hooks/query/json';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `grid grid-cols-2 gap-2 mo-md:grid-cols-3`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function BackgroundKeywords({ className, ...props }: Props) {
  const {
    json,
    loading,
    done,
  } = useGetBackgroundJson();

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {loading && (
        <LoadingCircle className='col-span-3' />
      )}

      {done && (
        <>
          <RandomButton
            name='배경스토리(현실)'
            purposeData={json.real.purpose}
            originData={json.real.origin}
            characterClassData={json.real.class}
            length={json.real.count}
            mode='background'
          />

          <RandomButton
            name='배경스토리(판타지)'
            purposeData={json.fantasy.purpose}
            originData={json.fantasy.origin}
            characterClassData={json.fantasy.class}
            length={json.fantasy.count}
            mode='background'
          />
        </>
      )}
    </div>
  );
}
