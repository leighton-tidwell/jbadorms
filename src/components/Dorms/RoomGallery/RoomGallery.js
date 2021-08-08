import React from 'react';
import { useRouter } from 'next/router';

import classes from './RoomGallery.module.css';

const RoomGallery = ({ images }) => {
  const router = useRouter();

  const handleClickImage = image => {
    router.push(image);
  };
  return (
    <div className={classes.grid}>
      {images.map(image => (
        <img
          onClick={() => handleClickImage(image.src)}
          key={image.id}
          src={image.src}
          className={classes.image}
          alt={image.alt}
        />
      ))}
    </div>
  );
};

export default RoomGallery;
