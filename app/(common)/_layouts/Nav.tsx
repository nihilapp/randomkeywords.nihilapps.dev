'use client';

import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  // 여기에 스타일을 추가하세요
`;

export function Nav() {
  return (
    <NavWrapper>
      {/* 여기에 네비게이션 내용을 추가하세요 */}
      <ul>
        <li><a href='/'>홈</a></li>
        <li><a href='/about'>소개</a></li>
        <li><a href='/contact'>연락처</a></li>
      </ul>
    </NavWrapper>
  );
}
