'use client';

import React from 'react';
import styled from 'styled-components';
import { useGetCategories } from '@/src/hooks/query';
import { tools } from '@/src/utils/tools';
import { size } from '@/src/styles';
import { ToggleSection } from '@/app/(cms)/_components';
import { CategoryItem } from './CategoryItem';
import { LoadingCircle } from '@/app/_components';

const List = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${size.normal[2]};
  flex-wrap: wrap;
`;

export function CategoryList() {
  const { categories, loading, done, } = useGetCategories();

  return (
    <ToggleSection title='카테고리 리스트' defaultOpen>
      {loading && <LoadingCircle />}
      {done && (
        <List>
          {categories.resData.map(
            (category) => (
              <CategoryItem
                key={tools.common.uuid()}
                category={category}
              />
            )
          )}
        </List>
      )}
    </ToggleSection>
  );
}
