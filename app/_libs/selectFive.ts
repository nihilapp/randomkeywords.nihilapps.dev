export function selectFive<T>(array: T[]): T[] {
  // 중복이 없어야 함.
  const result = [];

  while (result.length < 5) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!result.includes(array[randomIndex])) {
      result.push(array[randomIndex]);
    }
  }

  return result;
}
