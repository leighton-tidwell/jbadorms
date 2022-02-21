import React from 'react';
import { Icon } from '../';
import classes from './Input.module.css';

const Input = ({
  type,
  className,
  value,
  placeholder,
  onChange,
  disabled,
  search,
  ...props
}) => {
  return search ? (
    <div className={classes.container}>
      <input
        type={type}
        className={`${classes.input} ${className && className}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled ? true : false}
        autoComplete="off"
        {...props}
      />
      <Icon name="searchSharp" color="currentColor" />
    </div>
  ) : (
    <input
      type={type}
      className={`${classes.input} ${className && className}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled ? true : false}
      {...props}
    />
  );
};

export default Input;
