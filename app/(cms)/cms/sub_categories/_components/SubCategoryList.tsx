'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/_libs';
import { useGetSubCategories } from '@/_hooks/query/sub_categories';
import { LoadingCircle, ListItem } from '@/(common)/_components';
import { SearchBar } from '@/(cms)/cms/_components';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
}

interface FormValues {
  search: string;
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

export function SubCategoryList({ styles, ...props }: Props) {
  const {
    subCategories,
    isLoading,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSubCategories();

  const { ref, inView, } = useInView({
    threshold: 0,
    delay: 100,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [ inView, hasNextPage, isFetchingNextPage, fetchNextPage, ]);

  const formModel = object({
    search: string().optional(),
  });

  const form = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      search: '',
    },
  });

  const displayedSubCategories = useMemo(() => {
    const searchTerm = form.watch('search');
    if (!searchTerm) {
      return subCategories;
    }
    return subCategories.filter((item) => (
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ));
  }, [ subCategories, form.watch('search'), ]);

  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      {isLoading && (
        <LoadingCircle />
      )}
      {!isLoading && (
        <>
          {totalCount === 0 && subCategories.length === 0 && (
            <div className='text-center text-h3 font-900'>
              서브 카테고리가 없습니다.
            </div>
          )}
          {totalCount > 0 && (
            <>
              <div className='mb-5'>
                <SearchBar
                  register={form.register}
                  name='search'
                  placeholder={`총 ${totalCount}개 서브 카테고리 검색`}
                  styles='w-full'
                />
              </div>

              {displayedSubCategories.length > 0 && (
                <div className='grid grid-cols-2 mo-md:grid-cols-3 gap-2'>
                  {displayedSubCategories.map((subCategory) => (
                    <ListItem
                      key={subCategory.id}
                      href={`/cms/sub_categories/${subCategory.id}`}
                      name={subCategory.name}
                      upperCategory={subCategory.category.name}
                      length={subCategory._count.keyword}
                    />
                  ))}
                  {hasNextPage && (
                    <div ref={ref} className='col-span-full flex justify-center items-center p-4'>
                      {isFetchingNextPage && <LoadingCircle />}
                    </div>
                  )}
                </div>
              )}

              {form.watch('search') && displayedSubCategories.length === 0 && (
                <div className='text-center text-gray-500'>
                  검색 결과가 없습니다.
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
