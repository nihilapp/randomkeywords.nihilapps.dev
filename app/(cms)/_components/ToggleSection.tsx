'use client';

import { Icon } from '@iconify/react';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { color, size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
  disableToggle?: boolean;
}

const Section = styled.section`
  border: 2px solid ${color.black[200]};
  user-select: none;

  &:not(:last-child) {
    margin-bottom: ${size.normal[5]};
  }
`;

const ToggleButton = styled.button`
  font-size: ${size.text.h5};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  line-height: 0;
  width: 100%;
  padding: ${size.normal[2]};
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${color.black[50]};
  }
`;

const Title = styled.span`
  font-weight: 500;
`;

const IconWrapper = styled.span<{ $isOpen: boolean; }>`
  transform: ${({ $isOpen, }) => (
    $isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'
  )};
  transition: transform 0.2s ease-in-out;
`;

const SectionContent = styled.div<{ $isOpen: boolean; }>`
  border-top: 1px solid ${color.black[200]};
  max-height: ${({ $isOpen, }) => ($isOpen ? '1000px' : '0')};
  opacity: ${({ $isOpen, }) => ($isOpen ? '1' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.2s ease-in-out, padding 0.2s ease-in-out;
  padding: ${({ $isOpen, }) => ($isOpen ? size.normal[5] : `0 ${size.normal[5]}`)};
`;

export function ToggleSection({
  children, title, defaultOpen = false, disableToggle = false,
}: Props) {
  const [ isOpen, setIsOpen, ] = useState(defaultOpen);

  const onClickToggle = useCallback(() => {
    if (disableToggle) return;

    setIsOpen((prev) => !prev);
  }, [ disableToggle, ]);

  return (
    <Section>
      <ToggleButton type='button' onClick={onClickToggle}>
        <Title>{title}</Title>
        <IconWrapper $isOpen={isOpen}>
          <Icon icon='mdi:chevron-down' />
        </IconWrapper>
      </ToggleButton>
      <SectionContent $isOpen={isOpen}>
        {children}
      </SectionContent>
    </Section>
  );
}
