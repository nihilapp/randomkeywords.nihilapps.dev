import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/src/data';
import { SubCategoriesQuery } from '@/src/features/query';
import { useLoading } from '../../useLoading';
import { useDone } from '../../useDone';

export function useGetSubCategories() {
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: queryKeys.subCategories.getAll,
    queryFn: SubCategoriesQuery.getSubCategories,
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
