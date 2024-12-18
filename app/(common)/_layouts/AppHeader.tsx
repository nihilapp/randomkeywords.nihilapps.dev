'use client';

import React from 'react';
import styled from 'styled-components';
import { AppLogo, AppNav } from '@/app/(common)/_layouts';
import { color, size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
}

const Header = styled.header`
  font-size: ${size.text.md};
  color: ${color.black.base};
  font-weight: 500;
`;

export function AppHeader({ children, }: Props) {
  return (
    <Header>
      <AppLogo />

      <div>
        <AppNav />
      </div>
    </Header>
  );
}
