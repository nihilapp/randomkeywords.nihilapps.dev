'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useMemo, useEffect } from 'react';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { useGetKeywords } from '@/_hooks/query/keywords';
import { cn } from '@/_libs';
import { LoadingCircle } from '@/(common)/_components';
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

export function KeywordList({ styles, ...props }: Props) {
  const {
    keywords,
    loading,
    done,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetKeywords();

  const { ref, inView, } = useInView({
    threshold: 0,
    delay: 100,
  });

  const formModel = object({
    search: string()
      .optional(),
  });

  const form = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      search: '',
    },
  });

  const displayedKeywords = useMemo(() => {
    const searchTerm = form.watch('search');
    if (!searchTerm) {
      return keywords;
    }
    return keywords.filter((keyword) => (
      keyword.keyword
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ));
  }, [ keywords, form.watch('search'), ]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [ inView, hasNextPage, isFetchingNextPage, fetchNextPage, ]);

  return (
    <div
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
    >
      {loading && !done && (
        <LoadingCircle />
      )}
      {done && (
        <>
          {totalCount === 0 && (
            <div className='text-center text-h3 font-900'>
              키워드가 없습니다.
            </div>
          )}
          {totalCount > 0 && (
            <>
              <div className='mb-5'>
                <SearchBar
                  register={form.register}
                  name='search'
                  placeholder={`총 ${totalCount}개 키워드 검색`}
                  styles='w-full'
                />
              </div>

              {displayedKeywords.length > 0 && (
                <div className='grid grid-cols-2 mo-md:grid-cols-3 gap-2'>
                  {displayedKeywords.map((keyword) => (
                    <div
                      key={keyword.id}
                      className='flex flex-row justify-between p-2 rounded-2 border border-black-200'
                    >
                      <div className='flex flex-col items-start'>
                        <span className='text-xs text-gray-500'>{keyword.SubCategory.name}</span>
                        <span>{keyword.keyword}</span>
                      </div>
                    </div>
                  ))}
                  {hasNextPage && (
                    <div ref={ref} className='col-span-full flex justify-center items-center p-4'>
                      {isFetchingNextPage && <LoadingCircle />}
                    </div>
                  )}
                </div>
              )}

              {form.watch('search') && displayedKeywords.length === 0 && (
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
