import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { keywordsKeys } from '@/_data';
import { KeywordsQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import type { KeywordsPage, KeywordInfiniteQueryData } from '@/_types/keywords.types';

export function useSearchKeywords(word: string, subCategoryId: string = 'all') {
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...query
  } = useInfiniteQuery<KeywordsPage, Error, KeywordInfiniteQueryData, ReturnType<typeof keywordsKeys.search>, string | undefined>({
    queryKey: keywordsKeys.search(word, subCategoryId),
    queryFn: ({ pageParam, }) => KeywordsQuery.search({
      word,
      cursor: pageParam,
      subCategoryId,
    }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    placeholderData: keepPreviousData,
    enabled: !!word,
    staleTime: 1000 * 60 * 5,
  });

  const loading = useLoading(isLoading, isFetching);

  const keywords = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.count ?? 0;

  return {
    keywords,
    loading,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount,
    ...query,
  };
}
