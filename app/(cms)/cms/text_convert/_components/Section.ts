'use client';

import styled from 'styled-components';
import { size } from '@/src/styles';

export const Section = styled.section`
  &:not(:last-child) {
    margin-bottom: ${size.normal[5]};
  }
`;
