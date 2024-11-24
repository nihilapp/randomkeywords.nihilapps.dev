'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  InferType, number, object, string
} from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateCategory, useGetCategories } from '@/src/hooks/query';
import { queryKeys } from '@/src/data';
import {
  CmsForm, FormErrorMessage, FormNumber, FormText, ToggleSection
} from '@/app/(cms)/_components';
import { Button } from '@/app/_components';
import { ApiError } from '@/src/entities';

interface Inputs {
  name: string;
  order: number;
}

export function CreateCategoryButton() {
  const [ errorMessage, setErrorMessage, ] = useState('');

  const { categories, done, } = useGetCategories();

  useEffect(() => {
    if (done) {
      form.setValue('order', categories.resData.length + 1);
    }
  }, [ done, ]);

  const formModel = object({
    name: string().required('카테고리 이름을 입력해주세요.'),
    order: number().required('카테고리 순서를 입력해주세요.'),
  });

  const form = useForm<InferType<typeof formModel>>({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      name: '',
      order: 0,
    },
  });

  const qc = useQueryClient();
  const createCategory = useCreateCategory();

  const onCreateCategory: SubmitHandler<Inputs> = useCallback((data) => {
    createCategory.mutate({
      name: data.name,
      order: data.order,
    }, {
      onError(error: ApiError) {
        setErrorMessage(error.response.data.message);
      },
      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: queryKeys.categories.getAll,
        });

        form.reset();
      },
    });
  }, [ createCategory, ]);

  return (
    <ToggleSection title='카테고리 추가'>
      <CmsForm onSubmit={form.handleSubmit(onCreateCategory)}>
        <Controller
          control={form.control}
          name='name'
          render={({ field, }) => (
            <FormText
              label='카테고리 이름'
              id='name'
              name='name'
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={form.control}
          name='order'
          render={({ field, }) => (
            <FormNumber
              label='카테고리 순서'
              id='order'
              name='order'
              value={field.value.toString()}
              onChange={field.onChange}
            />
          )}
        />

        {errorMessage && (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        )}

        <Button
          type='submit'
          $color='black'
          $top
        >
          카테고리 추가
        </Button>
      </CmsForm>
    </ToggleSection>
  );
}
