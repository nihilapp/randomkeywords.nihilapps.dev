'use client';

import styled from 'styled-components';
import { color, size } from '@/src/styles';

export const Input = styled.input`
  width: 100%;
  display: block;
  padding: ${size.normal[2]};
  outline: none;
  border: 1px solid ${color.black[200]};
`;
