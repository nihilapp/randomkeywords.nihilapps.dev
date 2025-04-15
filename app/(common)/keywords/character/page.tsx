import React from 'react';
import { setMeta } from '@/_libs';
import { CharacterKeywords, SelectedKeyword } from '@/(common)/keywords/_components';
import { ToggleBlock } from '@/(common)/_components';

interface Props {}

export const metadata = setMeta({
  title: `캐릭터 키워드`,
  url: `/keywords/character`,
});

export default function CharacterKeywordsPage() {
  return (
    <div className='space-y-5'>
      <ToggleBlock
        title='캐릭터 관련 키워드'
      >
        <CharacterKeywords />
      </ToggleBlock>

      <ToggleBlock
        title='선택된 키워드'
      >
        <SelectedKeyword />
      </ToggleBlock>
    </div>
  );
}
