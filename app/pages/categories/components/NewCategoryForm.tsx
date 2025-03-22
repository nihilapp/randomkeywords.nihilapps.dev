// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';
import { Form } from 'react-router';
import { FormItem } from '~/pages/common/components/form';
import { Button } from '~/pages/common/components';
import { useForm } from '~/hooks';
import { cn } from '~/utils';

const newCategoryFormCva = cva(
  [
    'flex flex-col gap-2',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface NewCategoryFormProps extends HTMLAttributes<HTMLFormElement>, VariantProps<typeof newCategoryFormCva> {
  count: number;
}

export function NewCategoryForm({
  className,
  count,
  ...props
}: NewCategoryFormProps) {
  // useForm 훅 사용
  const {
    formState, isFormValid, onBlurField, resetForm, getFieldProps,
  } = useForm(
    // 초기값
    {
      name: '',
      order: (count + 1).toString(),
    },
    // 유효성 검사 규칙
    {
      name: {
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      order: {
        required: true,
      },
    }
  );

  // 폼 제출 전 유효성 검사
  const onSubmitForm = (event: React.FormEvent) => {
    if (!isFormValid) {
      event.preventDefault();
      // 모든 필드를 터치 상태로 변경하여 에러 메시지 표시
      Object.keys(formState).forEach((fieldName) => {
        onBlurField(fieldName);
      });
    }
  };

  return (
    <Form
      method='post'
      className={cn(newCategoryFormCva(), className)}
      onSubmit={onSubmitForm}
      onReset={() => resetForm()}
      {...props}
    >
      <FormItem
        label='카테고리 이름'
        idName='name'
        fieldProps={getFieldProps('name')}
      />

      <FormItem
        label='카테고리 순서'
        idName='order'
        type='hidden'
        fieldProps={getFieldProps('order')}
        readOnly
      />

      <div className='flex flex-row items-center gap-2 mt-5'>
        <Button
          type='submit'
          variant='primary'
          disabled={!isFormValid}
          flexMode='growShrink'
        >
          생성
        </Button>
        <Button
          type='reset'
          variant='danger'
          flexMode='growShrink'
        >
          초기화
        </Button>
      </div>
    </Form>
  );
}
