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

const hoverBgColorMap = {
  black: color.blue[500],
  white: color.red[500],
};

const hoverTextColorMap = {
  black: color.white,
  white: color.white,
};

const hoverBorderColorMap = {
  black: color.blue[500],
  white: color.red[500],
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
  flex: 1;
  flex-shrink: 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ $color, }) => (
    hoverBgColorMap[$color]
  )};
    color: ${({ $color, }) => (
    hoverTextColorMap[$color]
  )};
    border-color: ${({ $color, }) => (
    hoverBorderColorMap[$color]
  )};
  }
`;
