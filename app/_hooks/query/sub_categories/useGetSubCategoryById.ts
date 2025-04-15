import { useQuery } from '@tanstack/react-query';
import { subCategoriesKeys } from '@/_data';
import { SubCategoriesQuery } from '@/_features';
import { useDone } from '@/_hooks/useDone';
import { useLoading } from '@/_hooks/useLoading';

export function useGetSubCategoryById(id: string) {
  const {
    data: subCategory,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: subCategoriesKeys.detailId(id),
    queryFn: () => SubCategoriesQuery.getById(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    subCategory,
    loading,
    done,
    ...query,
  };
}
