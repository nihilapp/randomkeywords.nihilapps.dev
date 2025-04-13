'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { InfoBlock, LoadingCircle, ToggleBlock } from '@/(common)/_components';
import { useGetSubCategoryById } from '@/_hooks/query/sub_categories';
import { AddKeywordForm } from '@/(cms)/cms/keywords/_components/AddKeywordForm';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  id: string;
}

const cssVariants = cva(
  [
    `space-y-5`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function SubCategoryDetail({ styles, id, ...props }: Props) {
  const { subCategory, loading, done, } = useGetSubCategoryById(id);

  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <ToggleBlock
        title='서브 카테고리 정보'
      >
        {loading && (
          <LoadingCircle />
        )}
        {done && (
          <div className='space-y-2'>
            <InfoBlock
              name='이름'
              content={subCategory.name}
            />
            <InfoBlock
              name='노출 여부'
              content={subCategory.isProdHidden ? '비노출' : '노출'}
            />
            <InfoBlock
              name='키워드 개수'
              content={subCategory._count.Keyword.toString()}
              suffix='개'
            />
          </div>
        )}
      </ToggleBlock>

      <ToggleBlock
        title='키워드 추가'
      >
        <AddKeywordForm
          subCategoryId={id}
        />
      </ToggleBlock>
    </div>
  );
}
