'use client';

import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export function Home({ children, }: Props) {
  return (
    <div>
      <div>키워드 버튼</div>
      <div>키워드 결과</div>
    </div>
  );
}
