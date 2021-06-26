import React from "react";
import { Link } from "react-router-dom";

import classes from "./SplashNavigation.module.css";

const SplashNavigation = () => {
  return (
    <div className={classes["splash-navigation"]}>
      <div className={classes.row}>
        <Link to="/community" className={classes.element}>
          Community
          <br />
          Housing
        </Link>
        <Link to="/privatized" className={classes.element}>
          Privatized
          <br />
          Housing
        </Link>
      </div>
      <div className={classes.row}>
        <Link to="/furnishings" className={classes.element}>
          Furnishings
          <br />
          Management
        </Link>
        <Link to="/dorms" className={classes.element}>
          Unaccompanied
          <br />
          Housing
        </Link>
      </div>
    </div>
  );
};

export default SplashNavigation;
