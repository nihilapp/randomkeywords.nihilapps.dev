'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn, tools } from '@/_libs';
import { useKeywordStore } from '@/_entities/keywords';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  mode?: 'single' | 'multiple' | 'background';
}

const cssVariants = cva(
  [
    `text-center font-900 text-h5`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function SelectedKeyword({ className, mode = 'single', ...props }: Props) {
  const {
    subCategory, selectedPurpose, selectedOrigin, selectedClass, selectedKeywordList,
  } = useKeywordStore();

  const isGem = (keyword: string) => keyword.includes('보석/') || keyword.includes('암석(광물)') || keyword.includes('금속(합금)');

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {mode === 'single' && (
        <div className='flex flex-col gap-1 items-center justify-center'>
          <p className='text-md text-black-500 font-500'>{subCategory}</p>
          {subCategory === '아르카나' ? (
            <div className='flex flex-col gap-1'>
              <span className='text-blue-500'>{selectedKeywordList[0]}</span>
              <span className='text-md font-500 leading-1 text-black-500 italic mb-3'>{selectedKeywordList[1]}</span>
            </div>
          ) : (
            <p className='text-blue-500'>{selectedKeywordList[0]}</p>
          )}
        </div>
      )}
      {mode === 'multiple' && (
        <div className='space-y-2'>
          <p className='text-md text-black-500 font-500'>{subCategory}</p>
          <div className='space-y-1'>
            {selectedKeywordList.map((keyword) => (
              <p key={tools.common.uuid()} className='text-blue-500 flex flex-col items-center justify-center border border-black-100 rounded-2 p-2'>
                {keyword.includes(' (') && isGem(keyword) ? (
                  <>
                    <span>{keyword.split(' (')[0]}</span>
                    <span
                      className='text-md font-500 text-black-500 italic'
                    >
                      {'('}{keyword.split(' (')[1]}
                    </span>
                  </>
                ) : (
                  keyword
                )}
              </p>
            ))}
          </div>
        </div>
      )}
      {mode === 'background' && (
        (selectedPurpose && selectedOrigin && selectedClass) ? (
          <div className='flex flex-col gap-1 items-center justify-center'>
            <p className='text-md text-black-500 font-500'>{subCategory}</p>
            <p>
              <span className='text-blue-500'>{selectedPurpose}</span> 위해
            </p>
            <p>
              <span className='text-blue-500'>{selectedOrigin}</span>에서 온
            </p>
            <p>
              <span className='text-blue-500'>{selectedClass}</span>
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-1 items-center justify-center'>
            <p className='text-md text-black-500 font-500'>{subCategory}</p>
            <p className='text-blue-500'>
              버튼을 클릭하세요.
            </p>
          </div>
        )
      )}
    </div>
  );
}
