import { useState, useCallback } from 'react';

// 필드 유효성 검사 규칙 타입 정의
type ValidationRule = {
  required?: boolean;
  email?: boolean;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  errorMessage?: string;
};

// 폼 필드 타입 정의
type FormField = {
  value: string;
  touched: boolean;
  valid: boolean;
  error: string | null;
};

// 폼 필드들의 상태를 관리하는 타입
type FormState = {
  [key: string]: FormField;
};

// 유효성 검사 규칙들의 타입
type ValidationRules = {
  [key: string]: ValidationRule;
};

// 필드 props를 생성하는 함수의 반환 타입
export type FieldProps = {
  value: string;
  error: string | null;
  touched: boolean;
  valid: boolean;
  required: boolean;
  isInitialValue: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export function useForm(initialValues: { [key: string]: string } = {}, validationRules: ValidationRules = {}) {
  // 폼 상태 초기화
  const createInitialState = (): FormState => {
    const initialState: FormState = {};

    Object.keys(initialValues).forEach((key) => {
      initialState[key] = {
        value: initialValues[key],
        touched: false,
        valid: !validationRules[key]?.required || !!initialValues[key],
        error: null,
      };
    });

    return initialState;
  };

  const [ formState, setFormState, ] = useState<FormState>(createInitialState());
  const [ isFormValid, setIsFormValid, ] = useState(false);

  // 폼 전체의 유효성 검사
  const validateForm = useCallback(() => {
    const isValid = Object.keys(formState).every(
      (fieldName) => formState[fieldName].valid
    );
    setIsFormValid(isValid);
    return isValid;
  }, [ formState, ]);

  // 개별 필드 유효성 검사
  const validateField = useCallback((fieldName: string, value: string): { valid: boolean; error: string | null } => {
    const rules = validationRules[fieldName];

    if (!rules) {
      return { valid: true, error: null, };
    }

    // 필수 입력 검사
    if (rules.required && !value.trim()) {
      return { valid: false, error: rules.errorMessage || '필수 입력 항목입니다.', };
    }

    // 이메일 검사
    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { valid: false, error: rules.errorMessage || '이메일 형식이 올바르지 않습니다.', };
    }

    // 최소값 검사
    if (rules.minValue !== undefined && Number(value) < rules.minValue) {
      return { valid: false, error: rules.errorMessage || `최소값은 ${rules.minValue}입니다.`, };
    }

    // 최대값 검사
    if (rules.maxValue !== undefined && Number(value) > rules.maxValue) {
      return { valid: false, error: rules.errorMessage || `최대값은 ${rules.maxValue}입니다.`, };
    }

    // 최소 길이 검사
    if (rules.minLength !== undefined && value.length < rules.minLength) {
      return { valid: false, error: rules.errorMessage || `최소 ${rules.minLength}자 이상 입력해주세요.`, };
    }

    // 최대 길이 검사
    if (rules.maxLength !== undefined && value.length > rules.maxLength) {
      return { valid: false, error: rules.errorMessage || `최대 ${rules.maxLength}자까지 입력 가능합니다.`, };
    }

    // 정규식 패턴 검사
    if (rules.pattern && !rules.pattern.test(value)) {
      return { valid: false, error: rules.errorMessage || '올바른 형식이 아닙니다.', };
    }

    // 사용자 정의 유효성 검사
    if (rules.custom && !rules.custom(value)) {
      return { valid: false, error: rules.errorMessage || '유효하지 않은 값입니다.', };
    }

    return { valid: true, error: null, };
  }, [ validationRules, ]);

  // 입력값 변경 핸들러
  const onChangeField = useCallback((fieldName: string, value: string) => {
    const { valid, error, } = validateField(fieldName, value);

    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName] || { touched: false, },
        value,
        valid,
        error,
        touched: true,
      },
    }));

    // 폼 전체 유효성 검사 업데이트
    setTimeout(validateForm, 0);
  }, [ validateField, validateForm, ]);

  // 필드 터치 상태 설정 및 유효성 검사
  const onBlurField = useCallback((fieldName: string) => {
    const field = formState[fieldName];
    if (!field) return;

    // 필드가 비어있고 필수 입력인 경우 에러 표시
    const isEmpty = !field.value.trim();
    const isRequired = !!validationRules[fieldName]?.required;

    if (isEmpty && isRequired) {
      const errorMessage = validationRules[fieldName]?.errorMessage || '필수 입력 항목입니다.';

      setFormState((prevState) => ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          touched: true,
          valid: false,
          error: errorMessage,
        },
      }));
    } else {
      // 이미 유효성 검사가 된 상태라면 touched만 업데이트
      setFormState((prevState) => ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          touched: true,
        },
      }));
    }

    // 폼 전체 유효성 검사 업데이트
    setTimeout(validateForm, 0);
  }, [ formState, validationRules, validateForm, ]);

  // 폼 초기화
  const resetForm = useCallback(() => {
    setFormState(createInitialState());
    setIsFormValid(false);
  }, []);

  // 폼 데이터 가져오기
  const getFormValues = useCallback(() => {
    const values: { [key: string]: string } = {};
    Object.keys(formState).forEach((key) => {
      values[key] = formState[key].value;
    });
    return values;
  }, [ formState, ]);

  // 필드 props 생성 함수
  const getFieldProps = useCallback((fieldName: string): FieldProps => {
    const field = formState[fieldName] || {
      value: '',
      touched: false,
      valid: true,
      error: null,
    };

    // 현재 값이 초기값과 동일한지 확인
    const initialValue = initialValues[fieldName] || '';
    const isInitialValue = field.value === initialValue && initialValue !== '';

    return {
      value: field.value,
      error: field.error,
      touched: field.touched,
      valid: field.valid,
      required: !!validationRules[fieldName]?.required,
      isInitialValue,
      onChange: (value: string) => onChangeField(fieldName, value),
      onBlur: () => onBlurField(fieldName),
    };
  }, [ formState, validationRules, initialValues, onChangeField, onBlurField, ]);

  return {
    formState,
    isFormValid,
    onChangeField,
    onBlurField,
    resetForm,
    validateForm,
    getFormValues,
    getFieldProps,
  };
}
