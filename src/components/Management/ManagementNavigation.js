import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import ManagementNavLink from './ManagementNavLink';

import classes from './ManagementNavigation.module.css';

const ManagementNavigation = () => {
  const router = useRouter();
  const isActive = href => {
    return router.pathname === href;
  };

  return (
    <div className={classes.nav}>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <ManagementNavLink className={classes.link} href="/management/dorms">
            <div
              className={
                !isActive('/management/dorms')
                  ? `${classes['dorm-link']}`
                  : `${classes['active-dorm']}`
              }
            ></div>
            Dorms
          </ManagementNavLink>
        </li>
        <li className={classes.li}>
          <Link href="/management/housing">
            <a className={classes.link}>
              <div
                className={
                  !isActive('/management/housing')
                    ? `${classes['housing-link']}`
                    : `${classes['active-house']}`
                }
              ></div>
              Housing
            </a>
          </Link>
        </li>
        <li className={classes.li}>
          <Link href="/">
            <a className={classes.link}>
              <div className={classes['back-link']}></div>
              Back to home
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ManagementNavigation;
