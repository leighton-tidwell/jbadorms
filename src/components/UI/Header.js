import React from "react";

import classes from "./Header.module.css";

import ContentWrapper from "./ContentWrapper";
import Navigation from "./Navigation";
import Logo from "./Logo";

const Header = (props) => {
  return (
    <ContentWrapper>
      <div className={classes.header}>
        <Logo logo={props.logo} logoLink={props.logoLink} />
        <Navigation links={props.links} />
      </div>
    </ContentWrapper>
  );
};

export default Header;
