'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { color, size } from '@/src/styles';
import { ExtendedCategory } from '@/src/entities';

interface Props {
  category: ExtendedCategory;
}

const ListItem = styled(Link)`
${size.normal.grid(size.normal[2], 33.33, 3)};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${size.normal[1]};
  border: 1px solid ${color.black[200]};
  border-radius: ${size.normal[1]};
  padding: ${size.normal[2]};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${color.black[50]};
    border-color: ${color.black.base};
  }

  .category-name {
    margin-top: -${size.normal[0.5]};
  }

  .sub-count {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 25px;
    font-size: 80%;
    background-color: ${color.black.base};
    color: ${color.white};
    border-radius: ${size.normal[1]};
  }
`;

export function CategoryItem({ category, }: Props) {
  return (
    <ListItem href={`/cms/manage_category/main/${category.id}`}>
      <span className='category-name'>{category.name}</span>
      <span className='sub-count'>{category.SubCategory.length}</span>
    </ListItem>
  );
}
