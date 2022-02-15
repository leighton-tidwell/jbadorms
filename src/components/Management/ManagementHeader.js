import React from 'react';
import Link from 'next/link';

import classes from './ManagementHeader.module.css';

const ManagementHeader = ({ userName }) => {
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
    </div>
  );
};

export default ManagementHeader;
