import { useQuery } from '@tanstack/react-query';
import { keywordsKeys } from '@/_data';
import { KeywordsQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetKeywordsBySubCategoryId(subCategoryId: string) {
  const {
    data: keywords,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: keywordsKeys.detailSubCategoryId(subCategoryId),
    queryFn: () => KeywordsQuery.getBySubCategoryId(subCategoryId),
    enabled: !!subCategoryId,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    keywords,
    loading,
    done,
    ...query,
  };
}
