import React from 'react';
import { setMeta } from '@/_libs';
import { RandomKeywords, SelectedKeyword } from '@/(common)/keywords/_components';
import { ToggleBlock } from '@/(common)/_components';

interface Props {}

export const metadata = setMeta({
  title: `랜덤 키워드`,
  url: `/keywords/random`,
});

export default function page() {
  return (
    <div className='space-y-5'>
      <ToggleBlock
        title='랜덤 키워드'
      >
        <RandomKeywords />
      </ToggleBlock>

      <ToggleBlock
        title='선택된 키워드'
      >
        <SelectedKeyword mode='multiple' />
      </ToggleBlock>
    </div>
  );
}
