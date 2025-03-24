'use client';

import React from 'react';
import { CmsContent } from '@/(cms)/_layouts/CmsContent';

interface Props {
  children: React.ReactNode;
}

export function CmsLayout({ children, }: Props) {
  return (
    <CmsContent styles='text-md'>
      {children}
    </CmsContent>
  );
}
