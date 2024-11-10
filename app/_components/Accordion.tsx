'use client';

import styled from 'styled-components';
import { useState } from 'react';

const StyledAccordion = styled.div`
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
`;

const StyledAccordionItem = styled.div`
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const StyledAccordionTrigger = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f7fafc;
  }
`;

const StyledAccordionContent = styled.div<{ $isOpen: boolean }>`
  padding: ${(props) => (props.$isOpen ? '1rem' : '0')};
  height: ${(props) => (props.$isOpen ? 'auto' : '0')};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
`;

export const AccordionItem = ({ children, trigger, content, }: {
  children?: React.ReactNode;
  trigger: React.ReactNode;
  content: React.ReactNode;
}) => {
  const [ isOpen, setIsOpen, ] = useState(false);

  return (
    <StyledAccordionItem>
      <StyledAccordionTrigger onClick={() => setIsOpen(!isOpen)}>
        {trigger}
        <span style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, }}>▼</span>
      </StyledAccordionTrigger>
      <StyledAccordionContent $isOpen={isOpen}>
        {content}
      </StyledAccordionContent>
    </StyledAccordionItem>
  );
};

export const Accordion = ({ children, }: { children: React.ReactNode }) => {
  return <StyledAccordion>{children}</StyledAccordion>;
};
