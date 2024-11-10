'use client';

import React from 'react';
import styled from 'styled-components';
import { color, size } from '@/src/styles';

const HeaderWrapper = styled.header`
  background: linear-gradient(
    to right,
    ${color.gray[600]},
    ${color.gray[800]}
  );
  padding: ${size.normal[8]};
  border-radius: ${size.normal[2]};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: ${size.normal[10]};
  font-weight: 800;
  color: ${color.white};
  text-align: center;
`;

export function Header() {
  return (
    <HeaderWrapper>
      <Title>랜덤 키워드</Title>
      {/* 여기에 헤더 내용을 추가하세요 */}
    </HeaderWrapper>
  );
}
