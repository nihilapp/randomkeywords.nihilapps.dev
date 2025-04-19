import { selectOne } from './selectOne';

export function selectMany<T>(array: T[], count: number): T[] {
  // 입력 배열의 길이가 5 미만이면 배열 복사본을 섞어서 반환 (선택 사항, 원본 유지시 삭제)
  if (array.length < count) {
    // Fisher-Yates shuffle 알고리즘으로 배열 섞기
    const shuffled = array.slice(); // 원본 배열 변경 방지를 위해 복사
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ shuffled[i], shuffled[j], ] = [ shuffled[j], shuffled[i], ];
    }
    return shuffled;
  }

  const resultSet = new Set<T>();

  // 고유 요소가 5개가 되거나, 모든 배열 요소를 시도할 때까지 반복
  // (고유 요소가 5개 미만일 때 무한 루프 방지)
  while (resultSet.size < count && resultSet.size < array.length) {
    const selectedElement = selectOne(array);
    resultSet.add(selectedElement);
  }

  return Array.from(resultSet);
}
