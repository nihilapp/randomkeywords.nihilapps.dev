import { useQuery } from '@tanstack/react-query';
import { keywordsKeys } from '@/_data';
import { KeywordsQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetKeywords() {
  const {
    data: keywords,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: keywordsKeys.list(),
    queryFn: () => KeywordsQuery.getAll(),
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
