import { useQuery } from '@tanstack/react-query';
import { subCategoriesKeys } from '@/_data';
import { SubCategoriesQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetSubCategories() {
  const {
    data: subCategories,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: subCategoriesKeys.list(),
    queryFn: () => SubCategoriesQuery.getAll(),
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    subCategories,
    loading,
    done,
    ...query,
  };
}
