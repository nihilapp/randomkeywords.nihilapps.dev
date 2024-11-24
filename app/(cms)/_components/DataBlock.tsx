'use client';

import React from 'react';
import styled from 'styled-components';
import { color, size } from '@/src/styles';

interface Props {
  name: string;
  value: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${color.black[200]};
  border-radius: ${size.normal[1]};
`;

const Name = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: ${size.normal[2]};
  border-right: 1px solid ${color.black[200]};
`;

const Value = styled.div`
  flex: 1;
  padding: ${size.normal[2]};
`;

export function DataBlock({ name, value, }: Props) {
  return (
    <Container>
      <Name>{name}</Name>
      <Value>{value}</Value>
    </Container>
  );
}
