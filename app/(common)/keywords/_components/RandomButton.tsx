'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Keyword } from '@prisma/client';
import { cn, selectFive, selectOne } from '@/_libs';
import { useKeywordStore } from '@/_entities/keywords';
import { LoadingCircle } from '@/(common)/_components';

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  name: string;
  length: number;
  subCategoryId?: string;
  purposeData?: string[];
  originData?: string[];
  characterClassData?: string[];
  mode?: 'single' | 'multiple' | 'background';
}

const cssVariants = cva(
  [
    `p-2 rounded-2 border border-black-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 ease-in-out cursor-pointer`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const fetchRandomKeyword = async (subCategoryId: string | undefined): Promise<Keyword> => {
  if (!subCategoryId) {
    throw new Error('Subcategory ID is required');
  }
  const response = await fetch(`/api/keywords/random-one?subCategoryId=${subCategoryId}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch random keyword');
  }
  return response.json();
};

export function RandomButton({
  styles, name, length, subCategoryId, mode = 'single', purposeData, originData, characterClassData, ...props
}: Props) {
  const queryClient = useQueryClient();
  const {
    setSelectedKeyword, setSubCategory, setSelected5Keywords, setSelectedPurpose, setSelectedOrigin, setSelectedClass,
  } = useKeywordStore();

  const {
    data: randomKeyword,
    error,
    isFetching,
    refetch,
    isSuccess,
  } = useQuery<Keyword, Error>({
    queryKey: [ 'randomKeyword', subCategoryId, ],
    queryFn: () => fetchRandomKeyword(subCategoryId),
    enabled: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (isSuccess && randomKeyword && mode === 'single') {
      setSelectedKeyword(randomKeyword.keyword);
      setSubCategory(name);
    }
  }, [ isSuccess, randomKeyword, mode, name, setSelectedKeyword, setSubCategory, ]);

  useEffect(() => {
    if (error) {
      console.error('Failed to get random keyword:', error.message);
    }
  }, [ error, ]);

  const prefetchKeyword = () => {
    if (mode === 'single' && subCategoryId) {
      queryClient.prefetchQuery({
        queryKey: [ 'randomKeyword', subCategoryId, ],
        queryFn: () => fetchRandomKeyword(subCategoryId),
      });
    }
  };

  const onClickButton = () => {
    if (isFetching) {
      return;
    }

    if (mode === 'single') {
      refetch();
    }

    if (mode === 'background') {
      const randomPurpose = selectOne(purposeData);
      const randomOrigin = selectOne(originData);
      const randomCharacterClass = selectOne(characterClassData);

      setSelectedPurpose(randomPurpose);
      setSelectedOrigin(randomOrigin);
      setSelectedClass(randomCharacterClass);
      setSubCategory(name);
    }
  };

  return (
    <>
      {isFetching && mode === 'single' && (
        <div className='flex items-center justify-center p-2'>
          <LoadingCircle />
        </div>
      )}

      {(!isFetching || mode !== 'single') && (
        <button
          className={cn(
            cssVariants({}),
            styles,
            isFetching && mode === 'single' ? 'opacity-50 cursor-not-allowed' : ''
          )}
          {...props}
          onClick={onClickButton}
          onMouseEnter={prefetchKeyword}
          disabled={isFetching && mode === 'single'}
        >
          {name} ({length}개)
        </button>
      )}
    </>
  );
}
