import { useQuery } from '@tanstack/react-query';
import { categoriesKeys } from '@/_data';
import { CategoriesQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetCategories() {
  const {
    data: categories,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: categoriesKeys.list,
    queryFn: () => CategoriesQuery.getAll(),
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    categories,
    loading,
    done,
    ...query,
  };
}
