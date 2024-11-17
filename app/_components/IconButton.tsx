'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { Button } from '@/app/_components/Button';

interface Props {
  children?: React.ReactNode;
  color?: ('black' | 'red');
  icon?: string;
  iconSize?: number | string;
  type?: 'button' | 'submit';
  onClick?: any;
}

const ButtonLabel = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export function IconButton({
  children, color = 'black', icon, onClick, iconSize = '100%', type = 'button',
}: Props) {
  return (
    <Button type={type} $color={color} onClick={onClick}>
      {icon && (
        <Icon icon={icon} fontSize={iconSize} />
      )}
      <ButtonLabel>{children}</ButtonLabel>
    </Button>
  );
}
