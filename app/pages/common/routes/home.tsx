import { useFetcher, useNavigation } from 'react-router';
import { useEffect } from 'react';
import { NewTodo, TodoList } from '../components';
import type { Route } from './+types/home';
import { setMeta } from '~/utils';
import { createTodo, deleteAllTodos, getTodos } from '../queries';

export const loader = (
  async ({ request, }: Route.LoaderArgs) => {
    const todos = await getTodos();
    return { todos, };
  }
);

export const action = (
  async ({ request, }: Route.ActionArgs) => {
    switch (request.method) {
      case 'POST': {
        const formData = await request.formData();
        const content = formData.get('content');
        const todo = await createTodo(content as string);
        return { todo, };
      }
      case 'DELETE': {
        const { deletedCount, } = await deleteAllTodos();
        return { deletedCount, };
      }
      default:
        return { error: 'Invalid request method', };
    }
  }
);

export const meta = ({}: Route.MetaArgs) => {
  return setMeta({
    data: {
      title: `홈`,
      url: `/`,
    },
  });
};

export default function HomePage({
  loaderData,
}: Route.ComponentProps) {
  const { todos, } = loaderData;
  const deleteFetcher = useFetcher<{ deletedCount: number; }>();

  useEffect(() => {
    console.log(deleteFetcher.state);
    console.log(deleteFetcher.data);
  }, [ deleteFetcher, ]);

  return (
    <>
      <NewTodo deleteFetcher={deleteFetcher} />
      <TodoList todos={todos} />
    </>
  );
}
