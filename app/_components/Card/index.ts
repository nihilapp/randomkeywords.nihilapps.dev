'use client';

import styled from 'styled-components';
import { color, size } from '@/src/styles';

export const Card = styled.div`
  background-color: #fff;
  border-radius: ${size.normal[2]};
  border: 1px solid ${color.black[200]};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

export const CardContent = styled.div`
  padding: ${size.normal[6]};
`;
