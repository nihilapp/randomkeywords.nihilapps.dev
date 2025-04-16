import { useQuery } from '@tanstack/react-query';
import { jsonKeys } from '@/_data';
import { JsonQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetCharacterJson() {
  const {
    data: json,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: jsonKeys.character(),
    queryFn: () => JsonQuery.getCharacterJson(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    json,
    loading,
    done,
    ...query,
  };
}
