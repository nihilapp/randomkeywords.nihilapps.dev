'use client';

import React from 'react';
import styled from 'styled-components';
import { size } from '@/src/styles';
import { Section } from './Section';

interface Props {
  children?: React.ReactNode;
}

const SectionTitle = styled.h3`
  display: block;
  font-size: ${size.text.md};
  font-weight: 500;
`;

const SectionContent = styled.p`
  display: block;
  text-align: justify;
  margin-top: ${size.normal[2]};
  font-weight: 500;
`;

export function ConvertedText({ children, }: Props) {
  return (
    <Section>
      <SectionTitle>변환된 텍스트</SectionTitle>
      <SectionContent>{children}</SectionContent>
    </Section>
  );
}
