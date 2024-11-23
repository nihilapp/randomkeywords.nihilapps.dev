'use client';

import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
}

const Nav = styled.nav`
  font-size: ${size.text.md};
  font-weight: 500;
`;

export function AppNav({ children, }: Props) {
  return (
    <Nav>
      <Link href='/'>홈</Link>
    </Nav>
  );
}
