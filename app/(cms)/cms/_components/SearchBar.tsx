'use client';

import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { cn } from '@/_libs';

// 서브 카테고리 항목 타입 정의
interface SubCategoryOption {
  id: string;
  name: string;
}

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  styles?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  subCategories?: SubCategoryOption[];
  subCategoryFieldName?: Path<T>;
}

export function SearchBar<T extends FieldValues>({
  register,
  name,
  placeholder = '검색어를 입력하세요.',
  styles,
  onSubmit,
  subCategories,
  subCategoryFieldName,
}: Props<T>) {
  return (
    <form className={cn('flex flex-row items-stretch', styles)} onSubmit={onSubmit}>
      {subCategories && subCategoryFieldName && (
        <select
          {...register(subCategoryFieldName)}
          className='shrink-0 border border-r-0 border-black-200 rounded-l-2 p-2 bg-white focus:outline-none focus:border-blue-500'
        >
          {subCategories.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      )}
      <input
        className={cn(
          'flex-1 shrink-0 border border-r-0 border-black-200 p-2',
          !subCategories && 'rounded-l-2'
        )}
        type='search'
        placeholder={placeholder}
        {...register(name)}
      />
      <button type='submit' className='shrink-0 p-2 px-4 bg-black-700 text-white rounded-r-2 hover:bg-blue-500 transition-colors duration-200 ease-in-out cursor-pointer'>
        <FaSearch />
      </button>
    </form>
  );
}
