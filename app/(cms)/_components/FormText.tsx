'use client';

import React from 'react';
import { FormLabel } from './FormLabel';
import { LabelString } from './LabelString';
import { Input } from './Input';

interface Props {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange: any;
}

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
