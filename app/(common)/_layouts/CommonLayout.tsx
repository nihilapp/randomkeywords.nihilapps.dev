'use client';

import React from 'react';
import { CommonContent } from '@/(common)/_layouts/CommonContent';

interface Props {
  children: React.ReactNode;
}

export function CommonLayout({ children, }: Props) {
  return (
    <CommonContent>
      {children}
    </CommonContent>
  );
}
