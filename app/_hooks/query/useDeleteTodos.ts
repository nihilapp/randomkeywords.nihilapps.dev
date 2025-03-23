import { useMutation } from '@tanstack/react-query';
import { TodosQuery } from '@/_features';
import type { DeleteTodo } from '@/_types';

export function useDeleteTodos() {
  const query = useMutation({
    mutationFn: (deleteTodosDto: DeleteTodo) => (
      TodosQuery.deleteMany(deleteTodosDto)
    ),
  });

  return query;
}
