'use client';

import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';

interface Props {
  children?: React.ReactNode;
}

export function AppLayout({ children, }: Props) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
