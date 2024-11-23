'use client';

import styled, { css } from 'styled-components';
import { color, size } from '@/src/styles';

interface CategoryButtonProps {
  $type: 'main' | 'sub';
  $categoryType: 'main' | 'sub';
}

type CategoryType = 'main' | 'sub';
type CategoryButtonType = 'main' | 'sub';

function setColor(type: CategoryType, buttonType: CategoryButtonType) {
  if (type !== buttonType) {
    return css`
      color: ${color.black.base};
      background-color: ${color.white};

      &:hover {
        color: ${color.white};
        background-color: ${color.black.base};
        border-color: ${color.black.base};
      }
    `;
  }

  return css`
    color: ${color.white};
    background-color: ${color.black.base};
    border-color: ${color.black.base};
    cursor: default;

    &:hover {
      color: ${color.white};
      background-color: ${color.black.base};
      border-color: ${color.black.base};
    }
  `;
}

export const CategoryButton = styled.button<CategoryButtonProps>`
  flex: 1;
  flex-shrink: 0;
  border: 1px solid ${color.black[200]};
  padding: ${size.normal[2]};
  height: 60px;
  font-size: ${size.text.h5};
  font-weight: 500;
  line-height: 0;
  transition: all 0.2s ease-in-out;

  ${({ $type, $categoryType, }) => (
    setColor($type, $categoryType)
  )};
`;
