'use client';

import React from 'react';
import styled from 'styled-components';
import { AppLogo, AppNav } from '@/app/(common)/_layouts';

interface Props {
  children?: React.ReactNode;
}

const Header = styled.header`

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
