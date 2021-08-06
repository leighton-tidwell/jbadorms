import React from "react";
import classes from "./SplashNavigation.module.css";
import Link from "next/link";

const SplashNavigation = () => {
  return (
    <div className={classes["splash-navigation"]}>
      <div className={classes.row}>
        <Link href="/community">
          <a className={classes.element}>
            Community <br />
            Housing
          </a>
        </Link>
        <Link href="/privatized">
          <a className={classes.element}>
            Privatized <br />
            Housing
          </a>
        </Link>
      </div>
      <div className={classes.row}>
        <Link href="/furnishings">
          <a className={classes.element}>
            Furnishings <br />
            Management
          </a>
        </Link>
        <Link href="/dorms">
          <a className={classes.element}>
            Unaccompanied <br />
            Housing
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SplashNavigation;
