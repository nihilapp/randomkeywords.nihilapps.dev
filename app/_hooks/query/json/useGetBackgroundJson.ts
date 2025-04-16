import { useQuery } from '@tanstack/react-query';
import { jsonKeys } from '@/_data'; // jsonKeys 임포트 가정
import { JsonQuery } from '@/_features'; // JsonQuery 임포트 가정
import { useLoading } from '@/_hooks/useLoading'; // useLoading 임포트 가정
import { useDone } from '@/_hooks/useDone'; // useDone 임포트 가정

export function useGetBackgroundJson() {
  const {
    data: json,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    // queryKey를 background로 변경
    queryKey: jsonKeys.background(),
    // queryFn을 getBackgroundJson으로 변경
    queryFn: () => JsonQuery.getBackgroundJson(),
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
