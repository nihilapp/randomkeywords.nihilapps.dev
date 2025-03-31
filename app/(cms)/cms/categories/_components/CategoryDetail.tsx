'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn, tools } from '@/_libs';
import {
  InfoBlock, LoadingCircle, ToggleBlock
} from '@/(common)/_components';
import { useGetCategoryById } from '@/_hooks/query/categories';
import { AddSubCategoryForm, SubCategoryItem } from '@/(cms)/cms/sub_categories/_components';

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

export function CategoryDetail({ styles, id, ...props }: Props) {
  const { category, loading, done, } = useGetCategoryById(id);

  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      <ToggleBlock
        title='카테고리 정보'
      >
        {loading && (
          <LoadingCircle />
        )}
        {done && (
          <div className='space-y-2'>
            <InfoBlock
              name='이름'
              content={category.name}
            />
            <InfoBlock
              name='카테고리 순서'
              content={category.order.toString()}
              suffix='번'
            />
            <InfoBlock
              name='노출 여부'
              content={category.isProdHidden ? '비노출' : '노출'}
            />
            <InfoBlock
              name='서브 카테고리 개수'
              content={category.SubCategory.length.toString()}
              suffix='개'
            />
          </div>
        )}
      </ToggleBlock>

      <ToggleBlock
        title='서브 카테고리 리스트'
      >
        {loading && (
          <LoadingCircle />
        )}
        {done && (
          <>
            {category.SubCategory.length > 0 && (
              <div className='grid grid-cols-2 mo-md:grid-cols-3 gap-2'>
                {category.SubCategory.map((item) => (
                  <SubCategoryItem
                    key={tools.common.uuid()}
                    id={item.id}
                  />
                ))}
              </div>
            )}
            {category.SubCategory.length === 0 && (
              <div className='text-center text-h3 font-900'>
                서브 카테고리가 없습니다.
              </div>
            )}
          </>
        )}
      </ToggleBlock>

      <ToggleBlock
        title='서브 카테고리 추가'
      >
        <AddSubCategoryForm
          categoryId={id}
        />
      </ToggleBlock>
    </div>
  );
}
