'use client';

import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  number, object, string, type InferType
} from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import {
  Button, FormButtons, FormContainer, FormMessage, FormRadio, FormText
} from '@/(common)/_components/form';
import { useCreateCategory, useGetCategories } from '@/_hooks/query/categories';
import { categoriesKeys } from '@/_data';
import type { ApiError } from '@/_types';

interface FormValues {
  name: string;
  order: number;
  isProdHidden: string;
}

export function AddCategoryForm() {
  const [ errorMessage, setErrorMessage, ] = useState('');

  const { categories, done, } = useGetCategories();

  const formModel = object({
    name: string()
      .required('이름을 입력해주세요.'),
    order: number()
      .min(1, '순서는 1 이상이어야 합니다.')
      .required('순서를 입력해주세요.'),
    isProdHidden: string().default('false'),
  });

  const form = useForm<FormValues>({
    resolver: yupResolver(formModel),
    mode: 'all',
    defaultValues: {
      name: '',
      order: 1,
      isProdHidden: 'false',
    },
    reValidateMode: 'onChange',
    shouldFocusError: true,
    criteriaMode: 'all',
  });

  useEffect(() => {
    if (done && categories) {
      form.setValue('order', categories.length + 1);
    }
  }, [ done, categories, ]);

  useEffect(() => {
    form.trigger();
  }, [ form, ]);

  const { formState: { errors, }, } = form;

  const createCategory = useCreateCategory();
  const queryClient = useQueryClient();

  const onClickReset = () => {
    form.reset();
    createCategory.reset();
    setErrorMessage('');
  };

  const onSubmitForm: SubmitHandler<InferType<typeof formModel>> = (data) => {
    createCategory.mutate({
      name: data.name,
      order: data.order,
      isProdHidden: data.isProdHidden === 'true',
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: categoriesKeys.all,
        });

        form.reset();
        createCategory.reset();
        setErrorMessage('');
      },
      onError: (error: AxiosError<ApiError>) => {
        setErrorMessage(error.response?.data.message);
      },
    });
  };

  return (
    <FormContainer form={form} onSubmit={onSubmitForm}>
      <FormText
        name='name'
        label='이름'
        errorMessage={errors.name?.message}
      />
      <FormText
        name='order'
        label='순서'
        type='number'
        errorMessage={errors.order?.message}
      />
      <FormRadio
        name='isProdHidden'
        label='노출 여부'
        items={[
          { label: '노출', value: 'false', },
          { label: '미노출', value: 'true', },
        ]}
        errorMessage={errors.isProdHidden?.message}
      />

      {errorMessage && (
        <FormMessage>
          {errorMessage}
        </FormMessage>
      )}

      <FormButtons>
        <Button
          variant='blue'
          type='submit'
        >
          추가
        </Button>
        <Button
          variant='red'
          type='button'
          onClick={onClickReset}
        >
          초기화
        </Button>
      </FormButtons>
    </FormContainer>
  );
}
