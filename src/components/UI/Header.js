import React from "react";

import classes from "./Header.module.css";

import Navigation from "./Navigation";
import Logo from "./Logo";

const Header = (props) => {
  return (
    <div className={classes["header-container"]}>
      <div className={classes.header}>
        <Logo logo={props.logo} logoLink={props.logoLink} />
        <Navigation links={props.links} />
      </div>
    </div>
  );
};

export default Header;
