'use client';

import styled from 'styled-components';
import { media } from '@/src/styles';

export const CmsForm = styled.form`
  width: 100%;

  ${media.mosm`
    width: 50%;
  `};
`;
