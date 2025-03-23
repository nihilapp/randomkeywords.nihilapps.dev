import { useQuery } from '@tanstack/react-query';
import { todosKeys } from '@/_data';
import { TodosQuery } from '@/_features';
import { useLoading } from '@/_hooks/useLoading';
import { useDone } from '@/_hooks/useDone';

export function useGetTodos() {
  const {
    data: todos,
    isLoading,
    isFetching,
    isSuccess,
    ...query
  } = useQuery({
    queryKey: todosKeys.list,
    queryFn: () => TodosQuery.getAll(),
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    todos,
    loading,
    done,
    ...query,
  };
}
