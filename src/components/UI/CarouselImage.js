import React from 'react';

import classes from './CarouselImage.module.css';

const CarouselImage = ({ image, images, alt }) => {
  return <img className={image} src={images[0]} alt="A carousel image" />;
};

export default CarouselImage;
