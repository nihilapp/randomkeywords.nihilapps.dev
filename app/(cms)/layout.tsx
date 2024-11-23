'use client';

import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { CmsNav, CmsMain } from './_components';
import { color, media, size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${color.black[100]};
    color: ${color.black.base};
    width: 100%;
    padding: ${size.normal[5]};

    ${media.momd`
      max-width: 900px;
      margin: 0 auto;
    `}
  }
`;

const CmsTitle = styled.h1`
  font-size: ${size.text.h1};
  font-weight: 900;
  text-align: center;
  margin-bottom: ${size.normal[5]};
`;

export default function layout({ children, }: Props) {
  return (
    <>
      <GlobalStyle />

      <CmsTitle>CMS</CmsTitle>

      <CmsNav />

      <CmsMain>
        {children}
      </CmsMain>
    </>
  );
}
