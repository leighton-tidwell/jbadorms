import React from "react";
import { Link } from "react-router-dom";

import classes from "./LinkElement.module.css";

const LinkElement = (props) => {
  return (
    <Link to={props.href} className={classes["link-element"]}>
      <img alt="" className={classes.image} src={props.bgImage} />
      <span className={classes.text}>{props.children}</span>
    </Link>
  );
};

export default LinkElement;
