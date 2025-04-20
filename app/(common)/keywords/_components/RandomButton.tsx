'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import {
  cn, selectOne, selectMany, shuffleArray
} from '@/_libs';
import { useKeywordStore } from '@/_entities/keywords';

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  name: string;
  length: number;
  keywords?: string[];
  backgroundKeywords?: string[];
  purposeData?: string[];
  originData?: string[];
  characterClassData?: string[];
  mode?: 'single' | 'multiple' | 'background';
  count?: number;
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
  className, name, length, keywords, backgroundKeywords, mode = 'single', purposeData, originData, characterClassData, count = 5, ...props
}: Props) {
  const {
    setSubCategory, setSelectedPurpose, setSelectedOrigin, setSelectedClass, setSelectedKeywordList,
  } = useKeywordStore();

  const onClickButton = () => {
    if (mode === 'single') {
      let randomKeyword: string[];
      if (name === '아르카나') {
        randomKeyword = selectOne(keywords).split(':');
      } else {
        if (keywords && keywords.length > 0) {
          randomKeyword = [ selectOne(keywords), ];
        } else {
          console.warn(`No keywords provided for subCategory: ${name}`);
        }
      }
      setSelectedKeywordList(randomKeyword);
      setSubCategory(name);
    }

    if (mode === 'multiple') {
      if (keywords && keywords.length > 0) {
        if (count === 1) {
          const randomKeyword = selectOne(keywords);
          const bRandomKeyword = selectOne(backgroundKeywords);

          // 2분의 1 확률로 배경 키워드 / 그 외 랜덤 키워드 로 결정됨.
          const randomNumber = Math.floor(Math.random() * 4);

          if (randomNumber === 0) {
            setSelectedKeywordList([ bRandomKeyword, ]);
          } else {
            setSelectedKeywordList([ randomKeyword, ]);
          }
        } else {
          let backgroundRate: number;
          if (count === 5) {
            backgroundRate = 1;
          } else if (count === 10) {
            backgroundRate = 2;
          } else if (count === 50) {
            backgroundRate = 5;
          } else if (count === 100) {
            backgroundRate = 10;
          }

          const randomKeywords = selectMany(keywords, count - backgroundRate);
          const bKeywords = selectMany(backgroundKeywords, backgroundRate);
          const shuffledKeywords = shuffleArray([ ...randomKeywords, ...bKeywords, ]);
          setSelectedKeywordList(shuffledKeywords);
        }
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
        className
      )}
      {...props}
      onClick={onClickButton}
    >
      {name} ({length}개)
    </button>
  );
}
