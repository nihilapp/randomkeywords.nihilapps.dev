'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn, tools } from '@/_libs';
import { InfoBlock, LoadingCircle, ToggleBlock } from '@/(common)/_components';
import { useGetSubCategoryById } from '@/_hooks/query/sub_categories';
import { AddKeywordForm } from '@/(cms)/cms/keywords/_components/AddKeywordForm';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
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

export function SubCategoryDetail({ className, id, ...props }: Props) {
  const { subCategory, loading, done, } = useGetSubCategoryById(id);

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <ToggleBlock
        title='서브 카테고리 정보'
      >
        {loading && (
          <LoadingCircle />
        )}
        {done && subCategory && (
          <div className='space-y-2'>
            <InfoBlock
              name='이름'
              content={subCategory.name}
            />
            <InfoBlock
              name='노출 여부'
              content={subCategory.is_prod_hidden ? '비노출' : '노출'}
            />
            <InfoBlock
              name='키워드 개수'
              content={(subCategory._count?.keyword ?? 0).toString()}
              suffix='개'
            />
            <InfoBlock
              name='생성일'
              content={tools.calendar.dateToFormat(subCategory.created_at)}
            />
          </div>
        )}
      </ToggleBlock>

      <ToggleBlock
        title='키워드 추가'
      >
        <AddKeywordForm
          sub_category_id={id}
        />
      </ToggleBlock>
    </div>
  );
}
