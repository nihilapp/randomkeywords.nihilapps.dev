import React from 'react';
import { setMeta } from '@/_libs';
import { ToggleBlock } from '@/(common)/_components';
import { KeywordList } from '@/(cms)/cms/keywords/_components';

interface Props {}

export const metadata = setMeta({
  title: `키워드 관리`,
  url: `/cms/keywords`,
  robots: 'noindex, nofollow',
});

export default function page() {
  return (
    <div>
      <ToggleBlock
        title='키워드 리스트'
      >
        <KeywordList />
      </ToggleBlock>
    </div>
  );
}
