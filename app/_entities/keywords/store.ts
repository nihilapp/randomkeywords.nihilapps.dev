import { create } from 'zustand';

interface KeywordActions {
  setSelectedKeyword: (keyword: string) => void;
  setSelectedKeywordList: (keywordList: string[]) => void;
  setSelectedPurpose: (purpose: string) => void;
  setSelectedOrigin: (origin: string) => void;
  setSelectedClass: (characterClass: string) => void;
  setSubCategory: (subCategory: string) => void;
}

interface KeywordState {
  selectedKeyword: string;
  selectedKeywordList: string[];
  selectedPurpose: string;
  selectedOrigin: string;
  selectedClass: string;
  subCategory: string;
  actions: KeywordActions;
}

const KeywordStore = create<KeywordState>()((
  (set) => ({
    selectedKeyword: '버튼을 클릭하세요.',
    selectedPurpose: '',
    selectedOrigin: '',
    selectedClass: '',
    selectedKeywordList: [ '버튼을 클릭하세요.', ],
    subCategory: '',

    actions: {
      setSelectedKeyword: (keyword) => set(
        { selectedKeyword: keyword, }
      ),
      setSelectedPurpose: (purpose) => set(
        { selectedPurpose: purpose, }
      ),
      setSelectedOrigin: (origin) => set(
        { selectedOrigin: origin, }
      ),
      setSelectedClass: (characterClass) => set(
        { selectedClass: characterClass, }
      ),
      setSelectedKeywordList: (keywordList) => set(
        { selectedKeywordList: keywordList, }
      ),
      setSubCategory: (subCategory) => set(
        { subCategory, }
      ),
    },
  })
));

export const useSelectedKeyword = () => KeywordStore((state) => state.selectedKeyword);
export const useSelectedKeywordList = () => KeywordStore((state) => state.selectedKeywordList);
export const useSelectedPurpose = () => KeywordStore((state) => state.selectedPurpose);
export const useSelectedOrigin = () => KeywordStore((state) => state.selectedOrigin);
export const useSelectedClass = () => KeywordStore((state) => state.selectedClass);
export const useSubCategory = () => KeywordStore((state) => state.subCategory);

export const useKeywordActions = () => KeywordStore((state) => state.actions);
