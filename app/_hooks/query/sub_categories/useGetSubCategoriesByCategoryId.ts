import { useQuery } from '@tanstack/react-query';
import { subCategoriesKeys } from '@/_data';
import { SubCategoriesQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetSubCategoriesByCategoryId(categoryId: string) {
  const {
    data: subCategories,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: subCategoriesKeys.detailCategoryId(categoryId),
    queryFn: () => SubCategoriesQuery.getByCategoryId(categoryId),
    enabled: !!categoryId,
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
