import { Link } from 'react-router';

export function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul>
    </nav>
  );
}
