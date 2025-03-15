// import { Outlet } from 'react-router';

import type { Todo } from '~/types/todos.types';

interface Props {
  todos: Todo[];
}

export function TodoList({ todos, }: Props) {
  return (
    <div>
      {todos?.map((todo) => (
        <div key={todo.id}>{todo.content}</div>
      ))}
    </div>
  );
}
