'use client';

import React from 'react';
import { CategoryList } from './CategoryList';
import { CreateCategoryButton } from './CreateCategoryButton';

interface Props {
  children?: React.ReactNode;
}

export function MainCategory({ children, }: Props) {
  return (
    <>
      <CreateCategoryButton />
      <CategoryList />
    </>
  );
}
