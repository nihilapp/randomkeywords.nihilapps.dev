'use client';

import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  number, object, string, type InferType
} from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button, FormButtons, FormContainer, FormRadio, FormText
} from '@/(common)/_components/form';
import { useCreateCategory, useGetCategories } from '@/_hooks/query/categories';
import { categoriesKeys } from '@/_data';

export function AddCategoryForm() {
  const { categories, done, } = useGetCategories();

  const formModel = object({
    name: string()
      .required('이름을 입력해주세요.'),
    order: number()
      .min(1, '순서는 1 이상이어야 합니다.')
      .required('순서를 입력해주세요.'),
    isProdHidden: string().default('false'),
  });

  const form = useForm<InferType<typeof formModel>>({
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

  const onSubmitForm: SubmitHandler<InferType<typeof formModel>> = (data) => {
    createCategory.mutate({
      name: data.name,
      order: data.order,
      isProdHidden: data.isProdHidden === 'true',
    }, {
      onSuccess: (res) => {
        console.log(res);
        queryClient.invalidateQueries({
          queryKey: categoriesKeys.all,
        });

        form.reset();
        createCategory.reset();
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

      <FormButtons>
        <Button
          variant='blue'
          type='submit'
        >
          추가
        </Button>
      </FormButtons>
    </FormContainer>
  );
}
