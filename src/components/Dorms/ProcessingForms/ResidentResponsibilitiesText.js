import React from 'react';

import classes from './ResidentResponsibilitiesText.module.css';

const ResidentResponsibilitiesText = ({ className, title, children }) => {
  return (
    <div className={classes.container}>
      <span className={classes.title}>{title}:&nbsp;</span>
      <span className={classes.body}>{children}</span>
    </div>
  );
};

export default ResidentResponsibilitiesText;
