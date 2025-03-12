import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App', },
    { name: 'description', content: 'Welcome to React Router!', },
  ];
}

export default function Home() {
  return (
    <>
      <div>Home</div>

      <form action='/api' method='POST'>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
