import React from 'react';
import Link from 'next/link';

import classes from './ManagementHeader.module.css';
import { Icon } from '../UI';

const ManagementHeader = ({ userName, showNav, setShowNav }) => {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <a className={classes.logoLink}>JBA MHO</a>
        </Link>
        <span className={classes.subhead}>Management Portal</span>
      </div>
      <div className={classes.profile}>
        Logged in as <span className={classes.user}>{userName}</span>
      </div>
      <div
        onClick={() => setShowNav(!showNav)}
        className={classes['mobile-nav-toggle']}
      >
        <Icon size="32" name="menuSharp" />
      </div>
    </div>
  );
};

export default ManagementHeader;
