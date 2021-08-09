import React from 'react';

import classes from './ManagementHeader.module.css';

const ManagementHeader = ({ userName }) => {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>JBA MHO</div>
      <div className={classes.profile}>Logged in as {userName}</div>
    </div>
  );
};

export default ManagementHeader;
