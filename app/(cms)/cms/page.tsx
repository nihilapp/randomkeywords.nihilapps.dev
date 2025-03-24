import React from 'react';
import { setMeta } from '@/_libs';

interface Props {}

export const metadata = setMeta({
  title: `CMS`,
  url: `/cms`,
});

export default function CmsPage() {
  return (
    <div>content</div>
  );
}
