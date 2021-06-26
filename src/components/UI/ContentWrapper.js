import React from "react";

import classes from "./ContentWrapper.module.css";

const ContentWrapper = (props) => {
  return (
    <div
      className={`${props.className || ""} ${classes.wrapper}`}
      style={{ flexDirection: props.flexDirection || "" }}
    >
      {props.children}
    </div>
  );
};

export default ContentWrapper;
