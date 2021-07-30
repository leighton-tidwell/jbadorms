import React, { useState } from "react";
import classes from "./Navigation.module.css";

import { Link } from "react-router-dom";
import Hamburger from "../../images/hamburger_menu.svg";

import NavigationLink from "./NavigationLink";
import NavigationDropDown from "./NavigationDropDown";

const Navigation = (props) => {
  const [navigationStatus, setNavigationStatus] = useState(false);

  const navigationHandler = () => {
    setNavigationStatus((previousState) => !previousState);
  };

  const generateNavLinks = (link) => {
    if (link.dropdown)
      return <NavigationDropDown key={link.id} linkAndDropDownLinks={link} />;
    return <NavigationLink key={link.id} href={link.href} text={link.text} />;
  };
  return (
    <>
      <div
        onClick={navigationHandler}
        className={classes["mobile-navigation-handler"]}
      >
        <img alt="Hamburger menu" src={Hamburger} />
      </div>
      <div
        className={classes["mobile-navigation"]}
        style={{ display: navigationStatus ? "block" : "none" }}
      >
        {props.links.map((link) => (
          <Link
            key={link.id}
            className={classes["mobile-navigation-link"]}
            to={link.href}
          >
            {link.text}
          </Link>
        ))}
      </div>
      <div className={classes.navigation}>
        {props.links.map((link) => {
          return generateNavLinks(link);
        })}
      </div>
    </>
  );
};

export default Navigation;
