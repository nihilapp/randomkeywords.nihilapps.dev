'use client';

import styled from 'styled-components';
import { color, size } from '@/src/styles';
import { text } from '@/src/styles/size/size.text';

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${size.normal[0.5]} ${size.normal[2]};
  border-radius: 9999px;
  font-size: ${text.xs};
  font-weight: 500;
  background-color: ${color.black[200]};
  color: ${color.black.base};
`;
