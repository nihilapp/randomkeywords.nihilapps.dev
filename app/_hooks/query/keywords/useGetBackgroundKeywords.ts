import { useQuery } from '@tanstack/react-query';
import { jsonKeys } from '@/_data';
import { JsonQuery } from '@/_features';
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
    queryKey: jsonKeys.background(),
    queryFn: () => JsonQuery.getBackgroundJson(),
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
