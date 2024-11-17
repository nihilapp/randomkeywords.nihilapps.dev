'use client';

import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  // 여기에 스타일을 추가하세요
`;

export function Footer() {
  return (
    <FooterWrapper>
      <p>&copy; 2023 내 웹사이트. All rights reserved.</p>
    </FooterWrapper>
  );
}
