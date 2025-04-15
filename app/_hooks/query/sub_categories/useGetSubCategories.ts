import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { subCategoriesKeys } from '@/_data';
import { SubCategoriesQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetSubCategories() {
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...query
  } = useInfiniteQuery({
    queryKey: subCategoriesKeys.list(),
    queryFn: ({ pageParam, }) => SubCategoriesQuery.getAll({ cursor: pageParam, }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor,
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  const subCategories = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.count ?? 0;

  return {
    subCategories,
    loading,
    isLoading,
    done,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount,
    ...query,
  };
}
