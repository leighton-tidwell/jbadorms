import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${classes.button} ${props.className && props.className}`}
      type={props.button}
    >
      {props.children}
    </button>
  );
};

export default Button;
