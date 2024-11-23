'use client';

import React from 'react';
import styled from 'styled-components';
import { color, size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
}

const Footer = styled.footer`
  font-size: ${size.text.sm};
  color: ${color.black.base};
  font-weight: 500;
`;

export function AppFooter({ children, }: Props) {
  return (
    <Footer>footer</Footer>
  );
}
