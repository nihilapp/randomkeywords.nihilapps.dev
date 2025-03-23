import { useMutation } from '@tanstack/react-query';
import { TodosQuery } from '@/_features';

export function useDeleteTodo(id: string) {
  const query = useMutation({
    mutationFn: () => TodosQuery.delete(id),
  });

  return query;
}
