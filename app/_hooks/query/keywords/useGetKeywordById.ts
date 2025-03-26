import { useQuery } from '@tanstack/react-query';
import { keywordsKeys } from '@/_data';
import { KeywordsQuery } from '@/_features';
import { useDone } from '@/_hooks/useDone';
import { useLoading } from '@/_hooks/useLoading';

export function useGetKeywordById(id: string) {
  const {
    data: keyword,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: keywordsKeys.detailId(id),
    queryFn: () => KeywordsQuery.getById(id),
    enabled: !!id,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    keyword,
    loading,
    done,
    ...query,
  };
}
