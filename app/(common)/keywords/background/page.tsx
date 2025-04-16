import React from 'react';
import { setMeta } from '@/_libs';
import { ToggleBlock } from '@/(common)/_components';
import { BackgroundKeywords, SelectedKeyword } from '@/(common)/keywords/_components';

interface Props {}

export const metadata = setMeta({
  title: `배경스토리 키워드`,
  url: `/keywords/background`,
});

export default function BackgroundKeywordsPage() {
  return (
    <div className='space-y-5'>
      <ToggleBlock
        title='배경스토리 키워드'
      >
        <BackgroundKeywords />
      </ToggleBlock>

      <ToggleBlock
        title='선택된 키워드'
      >
        <SelectedKeyword mode='background' />
      </ToggleBlock>
    </div>
  );
}
