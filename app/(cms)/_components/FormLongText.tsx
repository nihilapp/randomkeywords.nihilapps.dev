'use client';

import React from 'react';
import styled from 'styled-components';
import { FormLabel } from './FormLabel';
import { color, size } from '@/src/styles';

interface Props {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange: any;
}

const LongText = styled.textarea`
  width: 100%;
  border: 2px solid ${color.black[200]};
  padding: ${size.normal[2]};
  resize: none;
  height: ${size.normal.px(150)};
  outline: none;

  &:focus {
    border-color: ${color.blue[500]};
  }
`;

export function FormLongText({
  label, name, id, value, onChange,
}: Props) {
  return (
    <>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <LongText id={id} name={name} value={value} onChange={onChange} />
    </>
  );
}
