import type { Route } from './+types';

export const loader = async ({ request, }: Route.LoaderArgs) => {
  console.log('api index loader');

  return Response.json({
    message: 'Hello, world!',
  });
};

export const action = async ({ request, }: Route.ActionArgs) => {
  if (request.method === 'POST') {
    console.log('api index post action');

    return Response.json({
      message: 'Hello, world!',
    });
  }
};
