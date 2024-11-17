'use client';

import React, { useCallback, useState } from 'react';
import { InferType, object, string } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CmsForm, FormLongText, PageTitle } from '@/app/(cms)/_components';
import { tools } from '@/src/utils/tools';
import { BottomButtons } from './BottomButtons';
import { Button } from '@/app/_components';
import { ConvertedText } from './ConvertedText';
import { Section } from './Section';

interface Inputs {
  text: string;
}

export function TextConvert() {
  const [ convertedText, setConvertedText, ] = useState('[]');

  const formModel = object({
    text: string().required('변환할 텍스트를 입력해주세요.'),
  });

  const form = useForm<InferType<typeof formModel>>({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      text: '',
    },
  });

  const onSubmitForm = useCallback((data: Inputs) => {
    const stringArray = data.text.split('\n');
    const filteredStringArray = stringArray.filter((string) => {
      return string.trim() !== '';
    });
    const convertedText = tools.common.string(filteredStringArray);

    setConvertedText(convertedText);
  }, []);

  const onClickReset = useCallback(() => {
    form.reset();
    setConvertedText('[]');
  }, []);

  return (
    <div>
      <Section>
        <PageTitle>텍스트 컨버터</PageTitle>
        <CmsForm onSubmit={form.handleSubmit(onSubmitForm)}>
          <Controller
            control={form.control}
            name='text'
            render={({ field, }) => (
              <FormLongText
                label='변환할 텍스트'
                name={field.name}
                id={field.name}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <BottomButtons>
            <Button $color='black' type='submit'>
              변환
            </Button>
            <Button $color='white' type='button' onClick={onClickReset}>
              초기화
            </Button>
          </BottomButtons>
        </CmsForm>
      </Section>

      <ConvertedText>{convertedText}</ConvertedText>
    </div>
  );
}
