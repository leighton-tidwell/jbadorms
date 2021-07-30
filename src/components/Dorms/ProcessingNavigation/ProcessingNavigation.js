import React from "react";

import ProcessingLink from "./ProcessingLink";

import classes from "./ProcessingNavigation.module.css";

const ProcessingNavigation = (props) => {
  return (
    <div className={classes.container}>
      <ul className={classes.navigation}>
        {props.navigationLinks.map((option) => (
          <ProcessingLink
            key={option.id}
            option={option}
            onLinkClick={props.onChangeForm}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProcessingNavigation;
