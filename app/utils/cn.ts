import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * tailwind 클래스를 조건부로 결합하는 유틸리티 함수
 * clsx로 클래스를 결합하고 tailwind-merge로 충돌을 해결합니다
 *
 * @param inputs 결합할 클래스 값들
 * @returns 병합된 클래스 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
