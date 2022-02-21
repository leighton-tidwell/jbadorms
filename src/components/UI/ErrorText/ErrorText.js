import React from 'react';
import classes from './ErrorText.module.css';

const ErrorText = ({ children, className }) => {
  return <div className={`${classes.error} ${className}`}>{children}</div>;
};

export default ErrorText;
