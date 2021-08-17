import React from 'react';

import classes from './TextArea.module.css';

const TextArea = ({
  className,
  children,
  onChange,
  placeholder,
  required,
  disabled
}) => {
  return (
    <textarea
      className={`${classes.textarea} ${className && className}`}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
    >
      {children}
    </textarea>
  );
};

export default TextArea;
