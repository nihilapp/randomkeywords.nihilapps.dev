'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { color, size } from '@/src/styles';

interface Props {
  children?: React.ReactNode;
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${color.black.base};
  padding: ${size.normal[1]} ${size.normal[2]};
  margin-left: auto;
  margin-bottom: ${size.normal[5]};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${color.black.base};
    color: ${color.white};
  }
`;

export function BackButton({ children, }: Props) {
  const router = useRouter();

  const onClickBack = useCallback(() => {
    router.back();
  }, [ router, ]);

  return (
    <Button
      onClick={onClickBack}
    >
      {children}
    </Button>
  );
}
