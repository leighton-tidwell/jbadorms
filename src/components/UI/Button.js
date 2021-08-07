import React from 'react';

import classes from './Button.module.css';

const Button = props => {
  return (
    <button
      className={`${classes.button} ${props.className && props.className}`}
      type={props.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
