'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn, tools } from '@/_libs';
import {
  InfoBlock, ListItem, LoadingCircle, ToggleBlock
} from '@/(common)/_components';
import { useGetCategoryById } from '@/_hooks/query/categories';
import { AddSubCategoryForm } from '@/(cms)/cms/sub_categories/_components';

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

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  id: string;
}

export function CategoryDetail({ className, id, ...props }: Props) {
  const { category, loading, done, } = useGetCategoryById(id);

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <ToggleBlock
        title='카테고리 정보'
      >
        {loading && (
          <LoadingCircle />
        )}
        {done && category && (
          <div className='space-y-2'>
            <InfoBlock
              name='이름'
              content={category.name}
            />
            <InfoBlock
              name='카테고리 순서'
              content={(category.order ?? 0).toString()}
              suffix='번'
            />
            <InfoBlock
              name='노출 여부'
              content={category.is_prod_hidden ? '비노출' : '노출'}
            />
            <InfoBlock
              name='서브 카테고리 개수'
              content={category.sub_category.length.toString()}
              suffix='개'
            />
            <InfoBlock
              name='생성일'
              content={tools.calendar.dateToFormat(category.created_at)}
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
        {done && category && (
          <>
            {category.sub_category.length > 0 && (
              <div className='grid grid-cols-2 mo-md:grid-cols-3 gap-2'>
                {category.sub_category.map((item) => (
                  <ListItem
                    key={tools.common.uuid()}
                    name={item.name}
                    href={`/cms/sub_categories/${item.id}`}
                    id={item.id}
                    length={item._count?.keyword ?? 0}
                  />
                ))}
              </div>
            )}
            {category.sub_category.length === 0 && (
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
          category_id={id}
        />
      </ToggleBlock>
    </div>
  );
}
