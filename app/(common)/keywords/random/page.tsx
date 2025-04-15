import React from 'react';
import { setMeta } from '@/_libs';

interface Props {}

export const metadata = setMeta({
  title: `랜덤 키워드`,
  url: `/keywords/random`,
});

export default function page() {
  return (
    <div>준비중...</div>
  );
}
