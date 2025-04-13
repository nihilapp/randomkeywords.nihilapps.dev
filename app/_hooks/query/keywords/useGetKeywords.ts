import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { keywordsKeys } from '@/_data';
import { KeywordsQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetKeywords() {
  // useInfiniteQuery 사용: 무한 스크롤 구현
  const {
    data, // 페이지별 데이터를 포함하는 객체 (data.pages)
    isLoading, // 초기 로딩 상태
    isFetching, // 데이터 요청 중 상태 (초기 로딩 포함)
    isSuccess, // 데이터 로딩 성공 상태
    fetchNextPage, // 다음 페이지 데이터를 가져오는 함수
    hasNextPage, // 다음 페이지 존재 여부 (getNextPageParam 결과 기반)
    isFetchingNextPage, // 다음 페이지 로딩 중 상태
    ...query
  } = useInfiniteQuery({
    queryKey: keywordsKeys.list(), // 쿼리 키
    // queryFn: 각 페이지 데이터를 가져오는 함수
    // pageParam은 getNextPageParam에서 반환된 값 (첫 페이지는 initialPageParam)
    queryFn: ({ pageParam, }) => KeywordsQuery.getAll({ cursor: pageParam, }),
    initialPageParam: undefined as string | undefined, // 첫 페이지 요청 시 cursor는 없음
    // getNextPageParam: 다음 페이지 요청 시 사용할 pageParam(cursor)을 결정하는 함수
    // lastPage: 마지막으로 로드된 페이지 데이터
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    placeholderData: keepPreviousData,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  // 모든 페이지의 keywords 데이터를 하나의 배열로 합침 (flatMap 사용)
  const keywords = data?.pages.flatMap((page) => page.items) ?? [];
  // 전체 키워드 개수 (첫 페이지 데이터에서 가져옴)
  const totalCount = data?.pages[0]?.count ?? 0;

  // 훅 반환값
  return {
    keywords, // 모든 페이지의 키워드 목록
    loading, // 초기 로딩 + fetching 상태
    done, // 로딩 완료 및 성공 상태
    fetchNextPage, // 다음 페이지 로드 함수 (컴포넌트에서 사용)
    hasNextPage, // 다음 페이지 존재 여부 (컴포넌트에서 사용)
    isFetchingNextPage, // 다음 페이지 로딩 상태 (컴포넌트에서 사용)
    totalCount, // 전체 키워드 개수
    ...query, // 기타 react-query 반환값
  };
}
