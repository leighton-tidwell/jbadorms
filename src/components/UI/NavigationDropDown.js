import React from "react";
import { Link } from "react-router-dom";

import classes from "./NavigationDropDown.module.css";
import ArrowDown from "../../images/arrow-down.svg";

const NavigationDropDown = (props) => {
  return (
    <div className={classes["dropdown"]}>
      <Link
        className={classes["navigation-link"]}
        to={props.linkAndDropDownLinks.href}
      >
        {props.linkAndDropDownLinks.text}{" "}
        <img
          className={classes.arrow}
          src={ArrowDown}
          alt="show sub navigation items"
        />
      </Link>
      <div className={classes["dropdown-content"]}>
        {props.linkAndDropDownLinks.dropdown.map((dropdownLink) => (
          <Link
            key={dropdownLink.id}
            className={classes["dropdown-link"]}
            to={dropdownLink.href}
          >
            {dropdownLink.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigationDropDown;
