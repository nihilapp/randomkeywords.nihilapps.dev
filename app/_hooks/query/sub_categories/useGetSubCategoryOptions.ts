import { useQuery } from '@tanstack/react-query';
import { subCategoriesKeys } from '@/_data'; // 쿼리 키 import
import { getSubCategoryIds } from '@/_libs'; // ID 가져오는 함수 import

// getSubCategoryIds 함수의 반환 타입 정의 (예상)
interface SubCategoryOption {
  id: string;
  name: string;
}

export function useGetSubCategoryOptions() {
  return useQuery<SubCategoryOption[], Error>({
    queryKey: subCategoriesKeys.options(), // 새로운 쿼리 키 정의 필요
    queryFn: getSubCategoryIds,
    staleTime: Infinity, // 서브 카테고리 목록은 자주 변하지 않으므로 캐시 유지
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
