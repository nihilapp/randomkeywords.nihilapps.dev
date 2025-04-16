'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn, selectFive, selectOne } from '@/_libs';
import { useKeywordStore } from '@/_entities/keywords';

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof cssVariants> {
  styles?: string;
  name: string;
  length: number;
  keywords: string[];
  purposeData?: string[];
  originData?: string[];
  characterClassData?: string[];
  mode?: 'single' | 'multiple' | 'background';
}

const cssVariants = cva(
  [
    `p-2 rounded-2 border border-black-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 ease-in-out cursor-pointer`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function RandomButton({
  styles, name, length, keywords, mode = 'single', purposeData, originData, characterClassData, ...props
}: Props) {
  const {
    setSelectedKeyword, setSubCategory, setSelected5Keywords, setSelectedPurpose, setSelectedOrigin, setSelectedClass,
  } = useKeywordStore();

  const onClickButton = () => {
    if (mode === 'single') {
      if (keywords && keywords.length > 0) {
        const randomKeyword = selectOne(keywords);
        setSelectedKeyword(randomKeyword);
        setSubCategory(name);
      } else {
        console.warn(`No keywords provided for subCategory: ${name}`);
      }
    }

    if (mode === 'multiple') {
      if (keywords && keywords.length > 0) {
        const randomKeywords = selectFive(keywords);
        setSelected5Keywords(randomKeywords);
        setSubCategory(name);
      } else {
        console.warn(`No keywords provided for subCategory: ${name}`);
      }
    }

    if (mode === 'background') {
      const randomPurpose = selectOne(purposeData);
      const randomOrigin = selectOne(originData);
      const randomCharacterClass = selectOne(characterClassData);

      setSelectedPurpose(randomPurpose);
      setSelectedOrigin(randomOrigin);
      setSelectedClass(randomCharacterClass);
      setSubCategory(name);
    }
  };

  return (
    <button
      className={cn(
        cssVariants({}),
        styles
      )}
      {...props}
      onClick={onClickButton}
    >
      {name} ({length}개)
    </button>
  );
}
