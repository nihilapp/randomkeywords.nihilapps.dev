'use client';

import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { object, string, type InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { FormContainer, FormRadio, FormText } from '@/(common)/_components/form';
import { useGetCategoryById } from '@/_hooks/query/categories';
import { useCreateSubCategory } from '@/_hooks/query/sub_categories';
import { categoriesKeys, subCategoriesKeys } from '@/_data';

interface Props {
  categoryId: string;
}

export function AddSubCategoryForm({ categoryId, }: Props) {
  const { category, done, } = useGetCategoryById(categoryId);
  const [ CategoryHidden, SetCategoryHidden, ] = useState('false');

  const formModel = object({
    name: string()
      .required('이름을 입력해주세요.'),
    isProdHidden: string(),
  });

  const form = useForm<InferType<typeof formModel>>({
    resolver: yupResolver(formModel),
    mode: 'all',
    defaultValues: {
      name: '',
      isProdHidden: CategoryHidden,
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

  const onSubmitForm: SubmitHandler<InferType<typeof formModel>> = (data) => {
    console.log(data);

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
    </FormContainer>
  );
}
