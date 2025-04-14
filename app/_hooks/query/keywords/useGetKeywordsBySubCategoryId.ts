import { useQuery } from '@tanstack/react-query';
import { KeywordsQuery } from '@/_features/query/keywords.query';
import { keywordsKeys } from '@/_data/keys.data';
import { useDone } from '@/_hooks/useDone';
import { useLoading } from '@/_hooks/useLoading';

export function useGetKeywordsBySubCategoryId(sub_category_id: string) {
  const {
    data: keywords,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: keywordsKeys.detailSubCategoryId(sub_category_id),
    queryFn: () => KeywordsQuery.getBySubCategoryId(sub_category_id),
    enabled: !!sub_category_id,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    keywords: keywords ?? [],
    loading,
    done,
    ...query,
  };
}
