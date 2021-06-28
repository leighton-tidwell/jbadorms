import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationLink.module.css";

const NavigationLink = (props) => {
  return (
    <NavLink
      activeClassName={classes.active}
      className={classes["navigation-link"]}
      to={props.href}
    >
      {props.text}
    </NavLink>
  );
};

export default NavigationLink;
