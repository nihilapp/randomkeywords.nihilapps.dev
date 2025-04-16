'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { useGetBackgroundKeywords } from '@/_hooks/query/keywords';
import { LoadingCircle } from '@/(common)/_components';
import { RandomButton } from '@/(common)/keywords/_components/RandomButton';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
}

const cssVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function BackgroundKeywords({ styles, ...props }: Props) {
  const {
    backgroundKeywords,
    loading,
    done,
  } = useGetBackgroundKeywords();

  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      {loading && (
        <LoadingCircle />
      )}

      {done && (
        <div className='grid grid-cols-2 gap-2 mo-md:grid-cols-3'>
          <RandomButton
            name='배경스토리(현실)'
            purposeData={backgroundKeywords.real.purpose}
            originData={backgroundKeywords.real.origin}
            characterClassData={backgroundKeywords.real.class}
            length={backgroundKeywords.real.count}
            mode='background'
          />

          <RandomButton
            name='배경스토리(판타지)'
            purposeData={backgroundKeywords.fantasy.purpose}
            originData={backgroundKeywords.fantasy.origin}
            characterClassData={backgroundKeywords.fantasy.class}
            length={backgroundKeywords.fantasy.count}
            mode='background'
          />
        </div>
      )}
    </div>
  );
}
