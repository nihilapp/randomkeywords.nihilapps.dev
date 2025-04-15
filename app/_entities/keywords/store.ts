import { create } from 'zustand';

interface KeywordState {
  selectedKeyword: string;
  setSelectedKeyword: (keyword: string) => void;
  selected5Keywords: string[];
  setSelected5Keywords: (keywords: string[]) => void;
  subCategory: string;
  setSubCategory: (subCategory: string) => void;
}

export const useKeywordStore = create<KeywordState>((set) => ({
  // 단일 키워드
  selectedKeyword: '버튼을 클릭하세요.',
  setSelectedKeyword: (keyword) => set(
    { selectedKeyword: keyword, }
  ),

  // 5개 키워드 목록
  selected5Keywords: [ '버튼을 클릭하세요.', '', '', '', '', ],
  setSelected5Keywords: (keywords) => set(
    { selected5Keywords: keywords, }
  ),

  // 서브 카테고리
  subCategory: '',
  setSubCategory: (subCategory) => set(
    { subCategory, }
  ),
}));
