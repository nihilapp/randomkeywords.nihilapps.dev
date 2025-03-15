// import { Outlet } from 'react-router';

import React, { useEffect, useRef } from 'react';
import { Form, useFetcher, useNavigation } from 'react-router';

interface Props {
  // children?: React.ReactNode;
}

export function NewTodo({ }: Props) {
  const { state, } = useNavigation();
  const inputRef = useRef<HTMLInputElement>(null);
  const deleteFetcher = useFetcher();

  useEffect(() => {
    if (state === 'idle') {
      inputRef.current.value = '';
    }
  }, [ state, ]);

  const onClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    deleteFetcher.submit({}, {
      method: 'DELETE',
    });
  };

  return (
    <Form method='post'>
      <label htmlFor='content'>
        <span>할 일</span>
        <input
          name='content'
          type='text'
          ref={inputRef}
          className='border border-black-200 p-2'
        />
      </label>
      <button
        type='submit'
        className='bg-blue-500 text-white p-2'
      >
        {state === 'submitting' ? '추가중...' : '추가'}
      </button>
      <button
        type='button'
        className='bg-red-500 text-white p-2'
        onClick={onClickDelete}
      >
        삭제
      </button>
    </Form>
  );
}
