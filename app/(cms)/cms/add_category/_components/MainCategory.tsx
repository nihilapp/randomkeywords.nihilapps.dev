'use client';

import React from 'react';
import { CategoryList } from './CategoryList';

interface Props {
  children?: React.ReactNode;
}

export function MainCategory({ children, }: Props) {
  return (
    <>
      <CategoryList />
    </>
  );
}
