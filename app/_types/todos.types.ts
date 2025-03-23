import { todoStatus, type todosTable } from '@/_entities/todos/todos.schema';

export type TodoStatus = (typeof todoStatus.enumValues)[ number ];
export type Todo = typeof todosTable.$inferSelect;

export interface CreateTodo {
  content: string;
  status?: TodoStatus;
}

export interface UpdateTodo {
  content?: string;
  status?: TodoStatus;
}

export interface DeleteTodo {
  ids: string[];
}
