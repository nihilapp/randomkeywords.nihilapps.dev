import React from 'react';
import { CmsLayout } from '@/(cms)/_layouts/CmsLayout';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, }: Props) {
  return (
    <CmsLayout>
      {children}
    </CmsLayout>
  );
}
