import { useNavigation } from 'react-router';
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
        console.log('delete');
        const { deletedCount, } = await deleteAllTodos();
        console.log('deletedCount', deletedCount);
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
  loaderData, actionData,
}: Route.ComponentProps) {
  const { state, formMethod, } = useNavigation();
  const { todos, } = loaderData;

  useEffect(() => {
    if (state === 'idle' && formMethod === 'DELETE') {
      console.log('count', actionData?.deletedCount);
    }
  }, [ state, formMethod, actionData, ]);

  return (
    <>
      <NewTodo />
      <TodoList todos={todos} />
    </>
  );
}
