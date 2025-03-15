import { createId } from '@paralleldrive/cuid2';
import { supabase } from '~/supabase-client';

export async function getTodos() {
  const { data, error, } = await supabase
    .from('todos')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function createTodo(content: string) {
  const { data, error, } = await supabase
    .from('todos')
    .insert({
      id: createId(),
      content,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteAllTodos() {
  const todos = await getTodos();

  const { error, } = await supabase
    .from('todos')
    .delete()
    .neq('id', '');

  if (error) {
    throw error;
  }

  return {
    deletedCount: todos.length,
  };
}
