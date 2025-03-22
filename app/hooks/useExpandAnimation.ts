import { useEffect, useRef, useState } from 'react';

/**
 * 확장 애니메이션 훅에 필요한 속성 인터페이스
 */
interface UseExpandAnimationProps {
  isOpen: boolean; // 컴포넌트의 열림/닫힘 상태
  defaultOpen?: boolean; // 초기 상태 설정 (기본값: false)
  dependencies?: any[]; // 추가적인 의존성 배열 (선택사항)
}

/**
 * 확장 애니메이션 훅의 반환 타입 인터페이스
 */
interface UseExpandAnimationReturn {
  contentRef: React.RefObject<HTMLDivElement>; // 콘텐츠 요소에 대한 참조
  heightStyle: React.CSSProperties; // 높이 애니메이션을 위한 스타일 객체
  updateHeight: () => void; // 높이를 수동으로 업데이트하는 함수
}

/**
 * 확장 가능한 컴포넌트의 애니메이션을 관리하는 커스텀 훅
 * @param isOpen 컴포넌트가 열려있는지 여부
 * @param defaultOpen 초기 상태가 열려있는지 여부
 * @param dependencies 추가적인 의존성 배열
 * @returns 컨텐츠 참조와 높이 스타일 객체, 높이 업데이트 함수
 */
export function useExpandAnimation({
  isOpen,
  defaultOpen = false,
  dependencies = [],
}: UseExpandAnimationProps): UseExpandAnimationReturn {
  // height 상태 관리: undefined는 'auto'로 변환됨, 숫자는 픽셀 값으로 변환
  const [ height, setHeight, ] = useState<number | undefined>(defaultOpen ? undefined : 0);
  // 콘텐츠 요소에 대한 참조 생성
  const contentRef = useRef<HTMLDivElement>(null);

  // 높이를 수동으로 업데이트하는 함수
  const updateHeight = () => {
    if (!contentRef.current || !isOpen) return;

    // 콘텐츠의 실제 높이로 설정
    const contentHeight = contentRef.current.scrollHeight;
    setHeight(contentHeight);
  };

  // isOpen 상태가 변경될 때마다 높이 조정
  useEffect(() => {
    // 참조가 없으면 실행하지 않음
    if (!contentRef.current) return;

    if (isOpen) {
      // 열린 상태: 콘텐츠의 실제 높이로 설정
      updateHeight();

      // ResizeObserver를 사용하여 콘텐츠 크기 변화 감지
      const resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });

      resizeObserver.observe(contentRef.current);

      // MutationObserver를 사용하여 DOM 변경 감지
      const mutationObserver = new MutationObserver(() => {
        updateHeight();
      });

      mutationObserver.observe(contentRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });

      // 클린업 함수
      return () => {
        if (contentRef.current) {
          resizeObserver.unobserve(contentRef.current);
          mutationObserver.disconnect();
        }
        resizeObserver.disconnect();
      };
    } else {
      // 닫힌 상태: 높이를 0으로 설정하여 닫힘 애니메이션 적용
      setHeight(0);
    }
  }, [ isOpen, ]);

  // 의존성 배열의 값이 변경될 때마다 높이 업데이트
  useEffect(() => {
    updateHeight();
  }, [ ...dependencies, ]);

  // CSS 스타일 객체 생성: height가 undefined면 'auto', 그렇지 않으면 픽셀 값
  const heightStyle: React.CSSProperties = {
    height: height === undefined ? 'auto' : `${height}px`,
    transition: 'height 0.3s ease-in-out',
    overflow: 'hidden',
  };

  // 참조와 스타일 객체, 업데이트 함수 반환
  return {
    contentRef,
    heightStyle,
    updateHeight,
  };
}
