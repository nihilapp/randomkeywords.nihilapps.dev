'use client';

import React from 'react';
import styled from 'styled-components';
import { color, size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
}

const Main = styled.main`
  padding: 20px;
  background-color: ${color.white};
  margin-top: ${size.normal[5]};
`;

export function CmsMain({ children, }: Props) {
  return (
    <Main>{children}</Main>
  );
}