'use client';

import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { cn } from '@/_libs';

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: keyof T & string;
  placeholder?: string;
  styles?: string;
}

export function SearchBar<T extends FieldValues>({
  register, name, placeholder = '검색어를 입력하세요.', styles,
}: Props<T>) {
  return (
    <form className={cn('flex flex-row', styles)} onSubmit={(e) => e.preventDefault()}>
      <input
        className='flex-1 shrink-0 border border-r-0 border-black-200 rounded-l-2 p-2'
        type='search'
        placeholder={placeholder}
        {...register(name as any)}
      />
      <button type='button' className='shrink-0 p-2 px-4 bg-black-700 text-white rounded-r-2 hover:bg-blue-500 transition-colors duration-200 ease-in-out cursor-pointer'>
        <FaSearch />
      </button>
    </form>
  );
}
