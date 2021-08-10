import React from 'react';
import classes from './SuccessText.module.css';

const SuccessText = ({ children, className }) => {
  return <div className={`${classes.success} ${className}`}>{children}</div>;
};

export default SuccessText;
