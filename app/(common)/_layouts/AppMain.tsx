'use client';

import React from 'react';
import styled from 'styled-components';
import { color, size } from '@/src/styles';

interface Props {
  children: React.ReactNode;
}

const Main = styled.main`
  font-size: ${size.text.md};
  font-weight: 500;
  color: ${color.black.base};
  width: 100%;
  padding: ${size.normal[2]};
`;

export function AppMain({ children, }: Props) {
  return (
    <>
      <Main>{children}</Main>
    </>
  );
}
