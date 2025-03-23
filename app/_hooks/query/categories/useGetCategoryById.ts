import { useQuery } from '@tanstack/react-query';
import { categoriesKeys } from '@/_data';
import { CategoriesQuery } from '@/_features';
import { useDone } from '@/_hooks/useDone';
import { useLoading } from '@/_hooks/useLoading';

export function useGetCategoryById(id: string) {
  const {
    data: category,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: categoriesKeys.detailId(id),
    queryFn: () => CategoriesQuery.getById(id),
    enabled: !!id,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    category,
    loading,
    done,
    ...query,
  };
}
