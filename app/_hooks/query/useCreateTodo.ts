import { useMutation } from '@tanstack/react-query';
import { TodosQuery } from '@/_features';
import type { CreateTodo } from '@/_types';

export function useCreateTodo() {
  const query = useMutation({
    mutationFn: (createTodoDto: CreateTodo) => (
      TodosQuery.create(createTodoDto)
    ),
  });

  return query;
}
