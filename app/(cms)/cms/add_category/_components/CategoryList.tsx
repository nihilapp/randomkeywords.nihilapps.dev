'use client';

import React from 'react';
import styled from 'styled-components';
import { useGetCategories } from '@/src/hooks/query';
import { tools } from '@/src/utils/tools';
import { color, size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
}

const List = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${size.normal[2]};
  flex-wrap: wrap;
`;

const ListItem = styled.div`
  ${size.normal.grid(size.normal[2], 33.33, 3)};

  flex-shrink: 0;
  border: 1px solid ${color.black[200]};
  border-radius: ${size.normal[1]};
  padding: ${size.normal[2]};
  text-align: center;
`;

export function CategoryList({ children, }: Props) {
  const { data: categories, loading, done, } = useGetCategories();

  return (
    <>
      {loading && (
        <div>loading</div>
      )}
      {done && (
        <List>
          {categories.resData.map((category) => (
            <ListItem key={tools.common.uuid()} data-id={category.id}>
              <div>{category.name}</div>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
