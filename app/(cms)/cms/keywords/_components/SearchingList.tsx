'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { cn } from '@/_libs';
import { useSearchKeywords } from '@/_hooks/query/keywords';
import { useGetSubCategoryOptions } from '@/_hooks/query/sub_categories';
import { LoadingCircle, ListItem } from '@/(common)/_components';
import { SearchBar } from '@/(cms)/cms/_components';

interface Props {
  word: string;
  sub_category_id: string;
  styles?: string;
}

interface FormValues {
  search: string;
  sub_category_id: string;
}

export function SearchingList({ word, sub_category_id, styles, }: Props) {
  const router = useRouter();

  const {
    keywords,
    isLoading,
    isSuccess,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchKeywords(word, sub_category_id);

  const { data: subCategoryOptions, isLoading: isLoadingSubCategories, } = useGetSubCategoryOptions();

  const { ref, inView, } = useInView({
    threshold: 0,
    delay: 100,
  });

  const form = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      search: word,
      sub_category_id,
    },
  });

  const onSubmitSearch = (data: FormValues) => {
    const { search, sub_category_id, } = data;

    if (search) {
      let queryString = `word=${encodeURIComponent(search)}`;
      if (sub_category_id && sub_category_id !== 'all') {
        queryString += `&sub_category_id=${sub_category_id}`;
      }
      router.push(`/cms/keywords/search?${queryString}`);
    }
  };

  useEffect(() => {
    if (word && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [ word, sub_category_id, inView, hasNextPage, isFetchingNextPage, fetchNextPage, ]);

  if (!word) {
    return <div className='text-center text-gray-500'>검색어를 입력해주세요.</div>;
  }

  return (
    <div
      className={cn(
        ``,
        styles
      )}
    >
      {(isLoading || isLoadingSubCategories) && <LoadingCircle />}
      {!isLoading && !isLoadingSubCategories && isSuccess && (
        <>
          {totalCount === 0 && keywords.length === 0 && (
            <div className='text-center text-h3 font-900'>
              {`${word}`}에 대한 검색 결과가 없습니다.
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
                  placeholder={`'${word}' 검색 결과 중 다시 검색`}
                  styles='w-full'
                  onSubmit={form.handleSubmit(onSubmitSearch)}
                />
              </div>
              <div className='mb-2 text-sm text-gray-600'>
                총 {totalCount}개의 키워드를 찾았습니다.
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
