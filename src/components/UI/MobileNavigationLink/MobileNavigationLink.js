import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from './MobileNavigationLink.module.css';

const MobileNavigationLink = ({ href, className, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link href={href}>
      <a
        className={`${className} ${isActive && classes.active} ${classes.link}`}
      >
        {children}
      </a>
    </Link>
  );
};

export default MobileNavigationLink;
