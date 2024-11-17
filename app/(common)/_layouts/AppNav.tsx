'use client';

import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
}

const Nav = styled.nav`

`;

export function AppNav({ children, }: Props) {
  return (
    <Nav>
      <Link href='/'>홈</Link>
    </Nav>
  );
}
