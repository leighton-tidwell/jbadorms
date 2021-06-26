import React from "react";
import classes from "./Navigation.module.css";

import { Link } from "react-router-dom";

const Navigation = (props) => {
  return (
    <div className={classes.navigation}>
      {props.links.map((link, i) => (
        <Link key={i} className={classes["navigation-link"]} to={link.href}>
          {link.text}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
