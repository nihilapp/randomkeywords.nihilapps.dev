import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/src/data';
import { CategoriesQuery } from '@/src/features/query';
import { useLoading } from '../../useLoading';
import { useDone } from '../../useDone';

export function useGetCategoryById(id: string) {
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: queryKeys.categories.getById(id),
    queryFn: () => CategoriesQuery.getCategory(id),
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    category: data,
    loading,
    done,
    ...query,
  };
}
