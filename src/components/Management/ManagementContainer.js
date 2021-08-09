import React from 'react';

import classes from './ManagementContainer.module.css';
import ManagementNavigation from './ManagementNavigation';

const ManagementContainer = ({ children }) => {
  return (
    <div className={classes.flex}>
      <ManagementNavigation />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default ManagementContainer;
