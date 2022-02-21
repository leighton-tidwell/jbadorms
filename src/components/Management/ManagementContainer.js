import React from 'react';

import classes from './ManagementContainer.module.css';
import ManagementNavigation from './ManagementNavigation';

const ManagementContainer = ({ children, showNav, setShowNav }) => {
  return (
    <div className={classes.flex}>
      <ManagementNavigation showNav={showNav} setShowNav={setShowNav} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default ManagementContainer;
