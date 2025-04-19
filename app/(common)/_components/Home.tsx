'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useEffect } from 'react';
import { cn } from '@/_libs';
import { H2 } from '@/(common)/_components/H2';
import { P } from '@/(common)/_components/P';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `space-y-5`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function Home({ className, ...props }: Props) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api');
      // const response = await fetch('/api?forceCreate=true');
      const data = await response.json();
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <H2>랜덤 키워드</H2>
      <P>
        아이디어가 고갈되었거나, 넘쳐나는 생각 속에서 길을 잃으셨나요? 랜덤 키워드는 바로 그런 창작자분들을 위해 탄생했습니다. 단 한 번의 클릭으로, 막막했던 머릿속에 신선한 영감을 불어넣어 드립니다.
      </P>
      <P>
        때로는 백지 앞에서 무엇을 그려야 할지, 어떤 이야기를 써 내려가야 할지 막막할 때가 있습니다. 혹은 너무 많은 아이디어가 떠올라 오히려 혼란스러울 수도 있죠. 이 프로젝트는 이런 고민의 순간에 간단하고 빠른 해결책을 제시합니다.
      </P>
      <P>
        다양한 카테고리의 키워드들이 준비되어 있고 원하는 만큼 클릭해서 키워드를 얻어가실 수 있습니다. 복잡한 과정 없이, 버튼 하나만 누르면 창작 활동에 바로 활용할 수 있는 흥미로운 키워드 조합을 얻을 수 있습니다.
      </P>
      <H2>누가 사용하면 좋을까요?</H2>
      <P className='flex flex-col gap-2'>
        <span>그림을 그리는 분들: 새로운 캐릭터 디자인, 배경 설정, 혹은 독특한 그림 주제가 필요할 때 영감을 얻어 가세요.</span>
        <span>글을 쓰는 분들: 다음 작품의 소재, 흥미로운 플롯 아이디어, 혹은 매력적인 캐릭터 설정을 찾는 데 도움을 받을 수 있습니다.</span>
        <span>모든 창작자분들: 장르에 관계없이, 창의적인 발상이 필요한 모든 분께 열려 있습니다.</span>
      </P>
      <H2>어떻게 사용하나요?</H2>
      <P>
        PC의 경우 좌측의 메뉴를 통해서. 모바일의 경우 좌측 상단의 햄버거 버튼을 클릭해서 메뉴로 이동하고 원하시는 키워드 카테고리를 선택하고, 버튼을 클릭하기만 하면 됩니다. 각 카테고리별로 특색있는 키워드들이 여러분의 선택을 기다리고 있습니다.
      </P>
      <P>
        이제 고민은 잠시 멈추고, 랜덤 키워드 생성기를 통해 무한한 아이디어의 세계를 탐험해 보세요. 다양한 카테고리에서 여러분의 다음 작품을 빛내줄 특별한 키워드를 발견하실 수 있을 겁니다. 지금 바로 시작하여 창작의 즐거움을 되찾으세요!
      </P>
    </div>
  );
}
