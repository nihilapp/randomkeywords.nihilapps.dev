'use client';

import styled from 'styled-components';
import { color, size } from '@/src/styles';

interface SmallButtonProps {
  $width: number;
}

export const SmallButton = styled.button<SmallButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width, }) => $width}px;
  margin-left: auto;
  border: 1px solid ${color.black[200]};
  padding: ${size.normal[2]};
  margin-top: ${size.normal[5]};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${color.black.base};
    border-color: ${color.black.base};
    color: ${color.white};
  }
`;
