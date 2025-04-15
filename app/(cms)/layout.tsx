import React from 'react';
import Link from 'next/link';
import { CmsLayout } from '@/(cms)/_layouts/CmsLayout';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, }: Props) {
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <CmsLayout>
          {children}
        </CmsLayout>
      )}

      {process.env.NODE_ENV === 'production' && (
        <div className='flex flex-col gap-2 items-center justify-center dvw-100 dvh-100 font-900 text-h2'>
          <span>접근할 수 없습니다.</span>
          <Link
            href='/'
            className='font-500 text-md p-2 border-2 border-blue-500 text-blue-500 rounded-2 hover:bg-blue-500 hover:text-white transition-colors duration-200 ease-in-out'
          >
            홈으로 돌아가기
          </Link>
        </div>
      )}
    </>
  );
}
