import { useMutation } from '@tanstack/react-query';
import { TodosQuery } from '@/_features';
import type { UpdateTodo } from '@/_types';

export function useUpdateTodo(id: string) {
  const query = useMutation({
    mutationFn: (updateTodoDto: UpdateTodo) => (
      TodosQuery.update(id, updateTodoDto)
    ),
  });

  return query;
}
