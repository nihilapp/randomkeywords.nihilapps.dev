'use client';

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Main = styled.main`

`;

export function AppMain({ children, }: Props) {
  return (
    <>
      <Main>{children}</Main>
    </>
  );
}
