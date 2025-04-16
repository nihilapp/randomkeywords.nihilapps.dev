import { useQuery } from '@tanstack/react-query';
import { jsonKeys } from '@/_data';
import { JsonQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetOtherJson() {
  const {
    data: json,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: jsonKeys.other(),
    queryFn: () => JsonQuery.getOtherJson(),
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
