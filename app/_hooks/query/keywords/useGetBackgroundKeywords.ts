import { useQuery } from '@tanstack/react-query';
import { keywordsKeys } from '@/_data';
import { KeywordsQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetBackgroundKeywords() {
  const {
    data: backgroundKeywords,
    isLoading,
    isSuccess,
    isFetching,
    ...query
  } = useQuery({
    queryKey: keywordsKeys.background(),
    queryFn: () => KeywordsQuery.getBackground(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    backgroundKeywords,
    loading,
    done,
    ...query,
  };
}
