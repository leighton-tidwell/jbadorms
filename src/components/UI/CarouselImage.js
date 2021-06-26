import React from "react";

import classes from "./CarouselImage.module.css";

const CarouselImage = (props) => {
  return <img className={classes.image} src={props.images[0]} />;
};

export default CarouselImage;
