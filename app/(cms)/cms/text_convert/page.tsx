import React from 'react';
import { setMeta } from '@/src/utils';
import { TextConvert } from './_components';

//interface Props {
//  children?: React.ReactNode;
//}

export const metadata = setMeta({
  title: `텍스트 컨버터`,
  url: `/cms/text_convert`,
});

export default function TextConvertPage() {
  return (
    <TextConvert />
  );
}
