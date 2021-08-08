import React from 'react';

import classes from './Form.module.css';

const Form = ({ onSubmit, className, children }) => {
  return (
    <form onSubmit={onSubmit} className={`${classes.form} ${className}`}>
      {children}
    </form>
  );
};

export default Form;
