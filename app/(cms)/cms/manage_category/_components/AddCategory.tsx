'use client';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { MainCategory } from './MainCategory';
import { SubCategory } from './SubCategory';
import { CategoryButton } from './CategoryButton';
import { size } from '@/src/styles';
import { TopNavi } from '@/app/(cms)/_components';

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${size.normal[2]};
  margin-bottom: ${size.normal[5]};
`;

export function AddCategory() {
  const [
    categoryType, setCategoryType,
  ] = useState<'main' | 'sub'>('main');

  const onClickMainCategory = useCallback(
    () => {
      setCategoryType('main');
    },
    []
  );

  const onClickSubCategory = useCallback(
    () => {
      setCategoryType('sub');
    },
    []
  );

  return (
    <>
      <TopNavi route={[ '홈', 'CMS', '카테고리 관리', ]} />

      <Buttons>
        <CategoryButton
          $type='main'
          $categoryType={categoryType}
          onClick={onClickMainCategory}
        >
          메인 카테고리
        </CategoryButton>
        <CategoryButton
          $type='sub'
          $categoryType={categoryType}
          onClick={onClickSubCategory}
        >
          서브 카테고리
        </CategoryButton>
      </Buttons>

      {categoryType === 'main' && <MainCategory />}
      {categoryType === 'sub' && <SubCategory />}
    </>
  );
}
