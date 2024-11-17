'use client';

import React from 'react';
import { AppMain, AppFooter, AppHeader } from '@/app/(common)/_layouts';

interface Props {
  children?: React.ReactNode;
}

export function AppLayout({ children, }: Props) {
  return (
    <>
      <AppHeader />

      <AppMain>
        {children}
      </AppMain>

      <AppFooter />
    </>
  );
}
