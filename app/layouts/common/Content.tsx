import { Aside } from './Aside';
import { Main } from './Main';

interface Props {
  children: React.ReactNode;
}

export function Content({ children, }: Props) {
  return (
    <div className='flex flex-row'>
      <Aside />
      <Main>
        {children}
      </Main>
    </div>
  );
}
