import React from 'react';

import classes from './Label.module.css';

const Label = ({ className, children, htmlFor }) => {
  return (
    <label className={`${classes.label} ${className}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
