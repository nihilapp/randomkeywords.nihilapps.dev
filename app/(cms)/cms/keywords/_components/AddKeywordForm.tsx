'use client';

import React, { useState } from 'react';
import { object, string, type InferType } from 'yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import {
  Button, FormButtons, FormContainer, FormMessage, FormText
} from '@/(common)/_components/form';
import { useCreateKeyword } from '@/_hooks/query/keywords';
import { subCategoriesKeys } from '@/_data';
import type { ApiError } from '@/_types';

interface Props {
  sub_category_id: string;
}

interface FormValues {
  keyword: string;
}

export function AddKeywordForm({ sub_category_id, }: Props) {
  const [ errorMessage, setErrorMessage, ] = useState('');

  const formModel = object({
    keyword: string()
      .required('키워드를 입력해주세요.'),
  });

  const form = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      keyword: '',
    },
  });

  const { formState: { errors, }, } = form;

  const qc = useQueryClient();
  const createKeyword = useCreateKeyword();

  const onClickReset = () => {
    form.reset();
    createKeyword.reset();
    setErrorMessage('');
  };

  const onSubmitForm: SubmitHandler<InferType<typeof formModel>> = (data) => {
    createKeyword.mutate({
      sub_category_id,
      keyword: data.keyword,
    }, {
      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: subCategoriesKeys.detailId(sub_category_id),
        });

        qc.invalidateQueries({
          queryKey: subCategoriesKeys.all,
        });

        form.reset();
        createKeyword.reset();
      },
      onError: (error: AxiosError<ApiError>) => {
        setErrorMessage(error.response?.data.message);
      },
    });
  };

  return (
    <FormContainer form={form} onSubmit={onSubmitForm}>
      <FormText
        name='keyword'
        label='키워드'
        errorMessage={errors.keyword?.message}
      />

      {errorMessage && (
        <FormMessage>
          {errorMessage}
        </FormMessage>
      )}

      <FormButtons>
        <Button>추가</Button>
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
