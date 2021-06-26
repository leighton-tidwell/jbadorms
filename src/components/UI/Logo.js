import React from "react";
import { Link } from "react-router-dom";

import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={classes.logo}>
      <Link className={classes["logo-link"]} to={props.logoLink}>
        {props.logo}
      </Link>
    </div>
  );
};

export default Logo;
