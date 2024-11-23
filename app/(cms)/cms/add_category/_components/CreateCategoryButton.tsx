'use client';

import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  InferType, number, object, string
} from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateCategory } from '@/src/hooks/query';
import { queryKeys } from '@/src/data';
import { FormText, ToggleSection } from '@/app/(cms)/_components';

interface Props {
  children?: React.ReactNode;
}

interface Inputs {
  name: string;
  order: number;
}

export function CreateCategoryButton({ children, }: Props) {
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
      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: queryKeys.categories.getAll,
        });
      },
    });
  }, [ createCategory, ]);

  return (
    <ToggleSection title='카테고리 생성'>
      <form onSubmit={form.handleSubmit(onCreateCategory)}>
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
      </form>
    </ToggleSection>
  );
}
