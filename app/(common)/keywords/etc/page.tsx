import React from 'react';
import { setMeta } from '@/_libs';
import { ToggleBlock } from '@/(common)/_components';
import { OtherKeywords, SelectedKeyword } from '@/(common)/keywords/_components';

interface Props {}

export const metadata = setMeta({
  title: `기타 키워드`,
  url: `/keywords/etc`,
});

export default function page() {
  return (
    <div className='space-y-5'>
      <ToggleBlock
        title='기타 키워드'
      >
        <OtherKeywords />
      </ToggleBlock>

      <ToggleBlock
        title='선택된 키워드'
      >
        <SelectedKeyword />
      </ToggleBlock>
    </div>
  );
}
