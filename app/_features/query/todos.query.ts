import { Api } from '@/_libs';
import type {
  CreateTodo, DeleteTodo, Todo, UpdateTodo
} from '@/_types/todos.types';

export class TodosQuery {
  static getAll() {
    return Api.getQuery<Todo[]>('/todos');
  }

  static getById(id: string) {
    return Api.getQuery<Todo>(`/todos/${id}`);
  }

  static create(createTodoDto: CreateTodo) {
    return Api.postQuery<Todo, CreateTodo>('/todos', createTodoDto);
  }

  static update(id: string, updateTodoDto: UpdateTodo) {
    return Api.patchQuery<Todo, UpdateTodo>(`/todos/${id}`, updateTodoDto);
  }

  static delete(id: string) {
    return Api.deleteQuery<Todo>(`/todos/${id}`);
  }

  static deleteMany(deleteTodosDto: DeleteTodo) {
    return Api.deletesQuery<Todo, DeleteTodo>(`/todos`, deleteTodosDto);
  }
}
