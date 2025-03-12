import { Outlet } from 'react-router';
import { Header } from './Header';
import { Nav } from './Nav';
import { Content } from './Content';
import { Footer } from './Footer';

interface Props {
  children: React.ReactNode;
}

export default function CommonLayout({ children, }: Props) {
  return (
    <>
      <Header />
      <Nav />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </>
  );
}
