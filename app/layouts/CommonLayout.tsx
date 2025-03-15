import { Outlet } from 'react-router';

interface Props {
  // children: React.ReactNode;
}

export function CommonLayout({}: Props) {
  return (
    <>
      <header>header</header>
      <nav>nav</nav>
      <div className='flex flex-row'>
        <aside className='p-2 shrink-0'>aside</aside>
        <main className='p-2 flex-1 shrink-0 min-h-0'>
          <Outlet />
        </main>
      </div>
      <footer>footer</footer>
    </>
  );
}
