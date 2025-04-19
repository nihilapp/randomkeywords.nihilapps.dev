'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { useGetInfiniteKeywords } from '@/_hooks/query/keywords';
import { useGetSubCategoryOptions } from '@/_hooks/query/sub_categories';
import { cn } from '@/_libs';
import { LoadingCircle, ListItem } from '@/(common)/_components';
import { SearchBar } from '@/(cms)/cms/_components';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

interface FormValues {
  search: string;
  sub_category_id: string;
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

export function KeywordList({ className, ...props }: Props) {
  const {
    keywords,
    isLoading,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteKeywords();

  const router = useRouter();

  const { data: subCategoryOptions, isLoading: isLoadingSubCategories, } = useGetSubCategoryOptions();

  const { ref, inView, } = useInView({
    threshold: 0,
    delay: 100,
  });

  const form = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      search: '',
      sub_category_id: 'all',
    },
  });

  const onSubmitSearch = (data: FormValues) => {
    const { search, sub_category_id, } = data;

    if (search) {
      let queryString = `word=${encodeURIComponent(search)}`;
      if (sub_category_id && sub_category_id !== 'all') {
        queryString += `&subCategoryId=${sub_category_id}`;
      }
      router.push(`/cms/keywords/search?${queryString}`);
    }
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [ inView, hasNextPage, isFetchingNextPage, fetchNextPage, ]);

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {(isLoading || isLoadingSubCategories) && <LoadingCircle />}
      {!isLoading && !isLoadingSubCategories && (
        <>
          {totalCount === 0 && keywords.length === 0 && (
            <div className='text-center text-h3 font-900'>
              키워드가 없습니다.
            </div>
          )}
          {totalCount > 0 && (
            <>
              <div className='mb-5'>
                <SearchBar<FormValues>
                  register={form.register}
                  name='search'
                  subCategoryFieldName='sub_category_id'
                  subCategories={subCategoryOptions}
                  placeholder={`총 ${totalCount}개 키워드 검색`}
                  className='w-full'
                  onSubmit={form.handleSubmit(onSubmitSearch)}
                />
              </div>

              {keywords.length > 0 && (
                <div className='grid grid-cols-2 mo-md:grid-cols-3 gap-2'>
                  {keywords.map((keyword) => (
                    <ListItem
                      key={keyword.id}
                      mode='nolink'
                      name={keyword.keyword}
                      upperCategory={keyword.sub_category.name}
                    />
                  ))}
                  {hasNextPage && keywords.length >= 50 && (
                    <div ref={ref} className='col-span-full flex justify-center items-center p-4'>
                      {isFetchingNextPage && <LoadingCircle />}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
