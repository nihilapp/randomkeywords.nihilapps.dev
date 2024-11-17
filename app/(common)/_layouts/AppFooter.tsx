'use client';

import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
}

const Footer = styled.footer`

`;

export function AppFooter({ children, }: Props) {
  return (
    <Footer>footer</Footer>
  );
}
