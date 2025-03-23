import { useQuery } from '@tanstack/react-query';
import { todosKeys } from '@/_data';
import { TodosQuery } from '@/_features';
import { useDone } from '@/_hooks/useDone';
import { useLoading } from '@/_hooks/useLoading';

export function useGetTodoById(id: string) {
  const {
    data: todo,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: todosKeys.detailId(id),
    queryFn: () => TodosQuery.getById(id),
    enabled: !!id,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    todo,
    loading,
    done,
    ...query,
  };
}
