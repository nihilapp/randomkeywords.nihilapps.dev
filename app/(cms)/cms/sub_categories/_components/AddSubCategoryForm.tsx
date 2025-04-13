'use client';

import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { object, string, type InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import {
  Button, FormButtons, FormContainer, FormMessage, FormRadio, FormText
} from '@/(common)/_components/form';
import { useGetCategoryById } from '@/_hooks/query/categories';
import { useCreateSubCategory } from '@/_hooks/query/sub_categories';
import { categoriesKeys, subCategoriesKeys } from '@/_data';
import type { ApiError } from '@/_types';

interface Props {
  categoryId: string;
}

interface FormValues {
  name: string;
  isProdHidden: string;
}

export function AddSubCategoryForm({ categoryId, }: Props) {
  const [ errorMessage, setErrorMessage, ] = useState('');
  const { category, done, } = useGetCategoryById(categoryId);

  const formModel = object({
    name: string()
      .required('이름을 입력해주세요.'),
    isProdHidden: string(),
  });

  const form = useForm<FormValues>({
    resolver: yupResolver(formModel),
    mode: 'all',
    defaultValues: {
      name: '',
      isProdHidden: category?.isProdHidden ? 'true' : 'false',
    },
    reValidateMode: 'onChange',
    shouldFocusError: true,
    criteriaMode: 'all',
  });

  useEffect(() => {
    form.trigger();
  }, [ form, ]);

  useEffect(() => {
    if (done) {
      form.setValue(
        'isProdHidden',
        category.isProdHidden ? 'true' : 'false'
      );
    }
  }, [ category, done, ]);

  const { formState: { errors, }, } = form;

  const createSubCategory = useCreateSubCategory();
  const qc = useQueryClient();

  const onClickReset = () => {
    form.reset();
    createSubCategory.reset();
    setErrorMessage('');
  };

  const onSubmitForm: SubmitHandler<InferType<typeof formModel>> = (data) => {
    createSubCategory.mutate({
      categoryId,
      name: data.name,
      isProdHidden: data.isProdHidden === 'false',
    }, {
      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: categoriesKeys.all,
        });

        qc.invalidateQueries({
          queryKey: categoriesKeys.detailId(categoryId),
        });

        qc.invalidateQueries({
          queryKey: subCategoriesKeys.all,
        });

        qc.invalidateQueries({
          queryKey: subCategoriesKeys.detailId(categoryId),
        });

        createSubCategory.reset();
        form.reset();
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

      <FormRadio
        name='isProdHidden'
        label='노출 여부'
        items={[
          {
            label: '노출',
            value: 'false',
          },
          {
            label: '비노출',
            value: 'true',
          },
        ]}
        errorMessage={errors.isProdHidden?.message}
      />

      {errorMessage && (
        <FormMessage>
          {errorMessage}
        </FormMessage>
      )}

      <FormButtons>
        <Button>
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
