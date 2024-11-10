'use client';

import React from 'react';
import { Header } from './Header';
import { Nav } from './Nav';
import { Main } from './Main';
import { Footer } from './Footer';

interface Props {
  children?: React.ReactNode;
}

export function AppLayout({ children, }: Props) {
  return (
    <>
      <Header />
      <Nav />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
