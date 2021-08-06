import React from "react";
import classes from "./index.module.css";

import HeroLogo from "../components/SplashPage/HeroLogo";
import SplashNavigation from "../components/SplashPage/SplashNavigation";

const Splashpage = () => {
  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <HeroLogo />
        <SplashNavigation />
      </div>
    </div>
  );
};

export default Splashpage;
