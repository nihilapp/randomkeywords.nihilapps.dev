import { create } from 'zustand';

interface KeywordState {
  selectedKeyword: string;
  setSelectedKeyword: (keyword: string) => void;
  selectedKeywordList: string[];
  setSelectedKeywordList: (keywordList: string[]) => void;
  selectedPurpose: string;
  setSelectedPurpose: (purpose: string) => void;
  selectedOrigin: string;
  setSelectedOrigin: (origin: string) => void;
  selectedClass: string;
  setSelectedClass: (characterClass: string) => void;
  subCategory: string;
  setSubCategory: (subCategory: string) => void;
}

export const useKeywordStore = create<KeywordState>((set) => ({
  // 단일 키워드
  selectedKeyword: '버튼을 클릭하세요.',
  setSelectedKeyword: (keyword) => set(
    { selectedKeyword: keyword, }
  ),

  // 목적
  selectedPurpose: '',
  setSelectedPurpose: (purpose) => set(
    { selectedPurpose: purpose, }
  ),

  // 출신지
  selectedOrigin: '',
  setSelectedOrigin: (origin) => set(
    { selectedOrigin: origin, }
  ),

  // 직업
  selectedClass: '',
  setSelectedClass: (characterClass) => set(
    { selectedClass: characterClass, }
  ),

  // 키워드 목록
  selectedKeywordList: [ '버튼을 클릭하세요.', ],
  setSelectedKeywordList: (keywordList) => set(
    { selectedKeywordList: keywordList, }
  ),

  // 서브 카테고리
  subCategory: '',
  setSubCategory: (subCategory) => set(
    { subCategory, }
  ),
}));
