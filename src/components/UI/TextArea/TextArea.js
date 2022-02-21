import React from 'react';

import classes from './TextArea.module.css';

const TextArea = ({
  className,
  children,
  onChange,
  placeholder,
  required,
  disabled,
  ...props
}) => {
  return (
    <textarea
      className={`${classes.textarea} ${className && className}`}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      {...props}
    >
      {children}
    </textarea>
  );
};

export default TextArea;
