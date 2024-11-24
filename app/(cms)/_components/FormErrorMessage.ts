'use client';

import styled from 'styled-components';
import { color, size } from '@/src/styles';

export const FormErrorMessage = styled.div`
  color: ${color.red[500]};
  font-weight: 900;
  font-size: ${size.text.md};
  text-align: center;
  margin-top: ${size.normal[5]};
`;
