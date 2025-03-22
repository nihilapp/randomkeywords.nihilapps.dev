// import { Outlet } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';
import { cn } from '~/utils';
import type { FieldProps } from '~/hooks/useForm';

const formItemCva = cva(
  [
    'flex flex-col gap-1',
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface FormItemProps extends HTMLAttributes<HTMLLabelElement>, VariantProps<typeof formItemCva> {
  label: string;
  idName: string;
  fieldProps?: FieldProps;
  disabled?: boolean;
  readOnly?: boolean;
  type?: 'text' | 'number' | 'password' | 'email' | 'hidden';
  placeholder?: string;
  hasInitialValue?: boolean;
}

export function FormItem({
  className,
  label,
  idName,
  fieldProps,
  disabled,
  readOnly,
  type = 'text',
  placeholder,
  hasInitialValue,
  ...props
}: FormItemProps) {
  // fieldProps가 없는 경우 기본값 설정
  const {
    value = '',
    error = null,
    touched = false,
    valid = true,
    required = false,
    onChange = () => {},
    onBlur = () => {},
    isInitialValue = false,
  } = fieldProps || {};

  const textlikeTypes = [ 'text', 'number', 'password', 'email', 'hidden', ];

  // 초기값 여부 결정 (props로 전달된 값 우선, 없으면 fieldProps의 값 사용)
  const hasDefaultValue = hasInitialValue !== undefined ? hasInitialValue : isInitialValue;

  // 필수 표시 여부 결정
  // 1. 필수 필드이고
  // 2. (읽기 전용이 아니거나, 읽기 전용이지만 초기값이 없는 경우)에만 표시
  const showRequired = required && (!readOnly || (readOnly && !hasDefaultValue));

  // 에러 표시 여부 결정 (터치된 필드에만 에러 표시)
  const showError = touched && error;

  return (
    <label
      className={cn(formItemCva(), className)}
      {...props}
    >
      {type !== 'hidden' && (
        <span className='font-900 flex flex-row gap-1'>
          {label}
          {showRequired && (
            <span className='text-red-500 font-900'>
              *
              <span className='sr-only'>필수 입력 필드</span>
            </span>
          )}
        </span>
      )}
      {textlikeTypes.includes(type) && (
        <input
          className={cn([
            'border border-black-200 rounded-2 p-2 outline-none focus:border-blue-500',
            showError ? 'border-red-500 focus:border-red-500' : '',
            hasDefaultValue ? 'border-green-500 focus:border-green-500' : '',
            !hasDefaultValue && touched && valid ? 'border-green-500 focus:border-green-500' : '',
            readOnly && 'bg-black-50',
          ])}
          type={type}
          id={idName}
          name={idName}
          required={required}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      )}
      {showError && (
        <span className='text-red-500 font-900 italic text-sm'>
          {error}
        </span>
      )}
    </label>
  );
}
