'use client';

import React from 'react';
import styled from 'styled-components';
import { FormLabel } from './FormLabel';

interface Props {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange: any;
}

const LabelString = styled.span`
  font-weight: 900;
`;

const Input = styled.input`
  width: 100%;
`;

export function FormText({
  label, name, id, value, onChange,
}: Props) {
  return (
    <FormLabel htmlFor={id}>
      <LabelString>{label}</LabelString>
      <Input
        type='text'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </FormLabel>
  );
}
