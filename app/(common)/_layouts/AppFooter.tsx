'use client';

import React from 'react';
import styled from 'styled-components';
import { size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
}

const Footer = styled.footer`
  font-size: ${size.text.sm};
  font-weight: 500;
`;

export function AppFooter({ children, }: Props) {
  return (
    <Footer>footer</Footer>
  );
}
