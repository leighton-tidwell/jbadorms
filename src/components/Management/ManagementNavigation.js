import React from 'react';

import Link from 'next/link';

import classes from './ManagementNavigation.module.css';

const ManagementNavigation = () => {
  return (
    <div className={classes.nav}>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <Link href="/management/dorms">
            <a className={classes.link}>
              <div className={classes['dorm-link']}></div>
              Dorms
            </a>
          </Link>
        </li>
        <li className={classes.li}>
          <Link href="/management/housing">
            <a className={classes.link}>
              <div className={classes['housing-link']}></div>
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
