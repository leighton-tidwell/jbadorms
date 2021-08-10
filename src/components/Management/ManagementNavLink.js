import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './ManagementNavLink.module.css';

export const ManagementNavLink = ({ href, className, children }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={
          router.pathname == href
            ? `${classes.active} ${className}`
            : `${className}`
        }
      >
        {children}
      </a>
    </Link>
  );
};

export default ManagementNavLink;
