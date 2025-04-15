import { useQuery } from '@tanstack/react-query';
import { SubCategoriesQuery } from '@/_features/query/sub_categories.query';
import { subCategoriesKeys } from '@/_data/keys.data';
import { useDone } from '@/_hooks/useDone';
import { useLoading } from '@/_hooks/useLoading';

export function useGetSubCategoriesByCategoryId(category_id: string) {
  const {
    data: subCategories,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: subCategoriesKeys.detailCategoryId(category_id),
    queryFn: () => SubCategoriesQuery.getByCategoryId(category_id),
    enabled: !!category_id,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    subCategories: subCategories ?? [],
    loading,
    done,
    ...query,
  };
}
