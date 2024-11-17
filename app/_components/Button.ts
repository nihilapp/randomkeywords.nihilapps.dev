'use client';

import styled from 'styled-components';
import { color, size } from '@/src/styles';

interface ButtonProps {
  $color?: ('black' | 'white');
}

const bgColorMap = {
  black: color.black.base,
  white: color.white,
};

const textColorMap = {
  black: color.white,
  white: color.black.base,
};

export const Button = styled.button<ButtonProps>`
  background-color: ${({ $color, }) => (
    bgColorMap[$color]
  )};
  border: 2px solid ${color.black.base};
  color: ${({ $color, }) => (
    textColorMap[$color]
  )};
  padding: ${size.normal[2]};

`;
