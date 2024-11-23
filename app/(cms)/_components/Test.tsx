'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { InferType, object, string } from 'yup';

interface Props {
  children?: React.ReactNode;
}

const Textarea = styled.textarea`
  width: 50%;
  height: 250px;
  border: 1px solid #000;
  resize: none;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid #000;
  display: block;
`;

const Select = styled.select`
  width: 50%;
  height: 50px;
  border: 1px solid #000;
`;

const Option = styled.option`
  width: 100%;
  height: 50px;
  border: 1px solid #000;
`;

interface Inputs {
  category: string;
  subcategory: string;
  keywords: string;
}

export function Test({ children, }: Props) {
  const formModel = object({
    category: string().required('카테고리를 선택해주세요.'),
    subcategory: string().required('서브카테고리를 선택해주세요.'),
    keywords: string().required('키워드를 입력해주세요.'),
  });

  const form = useForm<InferType<typeof formModel>>({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      category: '',
      subcategory: '',
      keywords: '',
    },
  });

  const onSubmitForm: SubmitHandler<Inputs> = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={form.handleSubmit(onSubmitForm)}>
      <Controller
        control={form.control}
        name='category'
        render={({ field, }) => (
          <Select {...field} />
        )}
      />

      <Controller
        control={form.control}
        name='subcategory'
        render={({ field, }) => (
          <Select {...field} />
        )}
      />

      <Controller
        control={form.control}
        name='keywords'
        render={({ field, }) => (
          <Textarea {...field} />
        )}
      />

      <Button type='submit'>버튼</Button>
    </form>
  );
}
