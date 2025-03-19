import { useEffect, useRef, useState } from 'react';

/**
 * 확장 애니메이션 훅에 필요한 속성 인터페이스
 */
interface UseExpandAnimationProps {
  isOpen: boolean; // 컴포넌트의 열림/닫힘 상태
  defaultOpen?: boolean; // 초기 상태 설정 (기본값: false)
}

/**
 * 확장 애니메이션 훅의 반환 타입 인터페이스
 */
interface UseExpandAnimationReturn {
  contentRef: React.RefObject<HTMLDivElement>; // 콘텐츠 요소에 대한 참조
  heightStyle: React.CSSProperties; // 높이 애니메이션을 위한 스타일 객체
}

/**
 * 확장 가능한 컴포넌트의 애니메이션을 관리하는 커스텀 훅
 * @param isOpen 컴포넌트가 열려있는지 여부
 * @param defaultOpen 초기 상태가 열려있는지 여부
 * @returns 컨텐츠 참조와 높이 스타일 객체
 */
export function useExpandAnimation({
  isOpen,
  defaultOpen = false,
}: UseExpandAnimationProps): UseExpandAnimationReturn {
  // height 상태 관리: undefined는 'auto'로 변환됨, 숫자는 픽셀 값으로 변환
  const [ height, setHeight, ] = useState<number | undefined>(defaultOpen ? undefined : 0);
  // 콘텐츠 요소에 대한 참조 생성
  const contentRef = useRef<HTMLDivElement>(null);

  // isOpen 상태가 변경될 때마다 높이 조정
  useEffect(() => {
    // 참조가 없으면 실행하지 않음
    if (!contentRef.current) return;

    if (isOpen) {
      // 열린 상태: 콘텐츠의 실제 높이로 설정
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      // 닫힌 상태: 높이를 0으로 설정하여 닫힘 애니메이션 적용
      setHeight(0);
    }
  }, [ isOpen, ]);

  // CSS 스타일 객체 생성: height가 undefined면 'auto', 그렇지 않으면 픽셀 값
  const heightStyle: React.CSSProperties = {
    height: height === undefined ? 'auto' : `${height}px`,
  };

  // 참조와 스타일 객체 반환
  return {
    contentRef,
    heightStyle,
  };
}
