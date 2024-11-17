'use client';

import React from 'react';
import styled from 'styled-components';
import { size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
}

const ConvertedSection = styled.section`

`;

const SectionTitle = styled.h3`
  display: block;
  font-size: ${size.text.md};
  font-weight: 500;
`;

const SectionContent = styled.p`
  display: block;
  margin-top: ${size.normal[2]};
`;

export function ConvertedText({ children, }: Props) {
  return (
    <ConvertedSection>
      <SectionTitle>변환된 텍스트</SectionTitle>
      <SectionContent>{children}</SectionContent>
    </ConvertedSection>
  );
}
