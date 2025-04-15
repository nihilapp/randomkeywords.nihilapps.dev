import React from 'react';
import { setMeta } from '@/_libs';
import { CmsHome } from '@/(cms)/_components';

interface Props {}

export const metadata = setMeta({
  title: `CMS`,
  url: `/cms`,
  robots: 'noindex, nofollow',
});

export default function CmsPage() {
  return (
    <CmsHome />
  );
}
