import { useQuery } from '@tanstack/react-query';
import { CategoriesQuery } from '@/src/features/query';
import { queryKeys } from '@/src/data';
import { useLoading } from '../../useLoading';
import { useDone } from '../../useDone';

export function useGetCategories() {
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: queryKeys.categories.getAll,
    queryFn: CategoriesQuery.getCategories,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    data,
    loading,
    done,
    ...query,
  };
}
