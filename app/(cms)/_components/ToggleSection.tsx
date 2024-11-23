'use client';

import { Icon } from '@iconify/react';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { color, size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
  title: string;
}

const Section = styled.section`
  border: 1px solid ${color.black[200]};
  user-select: none;

  &:not(:last-child) {
    margin-bottom: ${size.normal[5]};
  }
`;

const ToggleButton = styled.h2`
  font-size: ${size.text.h5};
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 0;
  justify-content: space-between;
  width: 100%;
  padding: ${size.normal[2]};
`;

const SectionContent = styled.div`
  padding: ${size.normal[2]};
  border-top: 1px solid ${color.black[200]};
`;

export function ToggleSection({ children, title, }: Props) {
  const [ isOpen, setIsOpen, ] = useState(false);

  const onClickToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <Section>
      <ToggleButton onClick={onClickToggle}>
        <span>{title}</span>
        {isOpen && (
          <Icon icon='mdi:chevron-down' />
        )}
        {!isOpen && (
          <Icon icon='mdi:chevron-right' />
        )}
      </ToggleButton>
      {isOpen && (
        <SectionContent>{children}</SectionContent>
      )}
    </Section>
  );
}
