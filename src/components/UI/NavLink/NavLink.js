import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './NavLink.module.css';

export const NavLink = ({ href, className, children }) => {
  const router = useRouter();
  const active = router.pathname === href ? `${classes.active}` : '';

  return (
    <Link href={href}>
      <a className={`${className} ${active}`}>{children}</a>
    </Link>
  );
};

export default NavLink;
