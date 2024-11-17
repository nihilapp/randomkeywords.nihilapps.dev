'use client';

import React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.main`
  // 여기에 스타일을 추가하세요
`;

export function Main({ children, }: { children: React.ReactNode }) {
  return (
    <MainWrapper>
      {children}
    </MainWrapper>
  );
}
