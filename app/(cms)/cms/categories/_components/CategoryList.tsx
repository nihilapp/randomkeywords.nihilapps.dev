'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useMemo } from 'react';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/_libs';
import { useGetCategories } from '@/_hooks/query/categories';
import { ListItem, LoadingCircle } from '@/(common)/_components';
import { SearchBar } from '@/(cms)/cms/_components';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
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

export function CategoryList({ className, ...props }: Props) {
  const {
    categories,
    loading,
    done,
  } = useGetCategories();

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

  const displayedCategories = useMemo(() => {
    const searchTerm = form.watch('search');
    if (!searchTerm) {
      return categories;
    }
    return categories.filter((item) => (
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ));
  }, [ categories, form.watch('search'), ]);

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {loading && (
        <LoadingCircle />
      )}
      {done && (
        <>
          {categories.length === 0 && (
            <div className='text-center text-h3 font-900'>
              카테고리가 없습니다.
            </div>
          )}
          {categories.length > 0 && (
            <>
              <div className='mb-5'>
                <SearchBar
                  register={form.register}
                  name='search'
                  placeholder={`총 ${categories.length}개 카테고리 검색`}
                  className='w-full'
                />
              </div>

              {displayedCategories.length > 0 ? (
                <div className='grid grid-cols-2 mo-md:grid-cols-3 gap-2'>
                  {displayedCategories.map((item) => (
                    <ListItem
                      key={item.id}
                      href={`/cms/categories/${item.id}`}
                      name={item.name}
                      length={item.sub_category.length || 0}
                    />
                  ))}
                </div>
              ) : (
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
