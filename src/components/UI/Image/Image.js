import React from 'react';
import { default as NextImage } from 'next/image';

const Image = ({ className, src, alt, onClick }) => {
  return (
    <div className={className}>
      <NextImage src={src} layout="fill" objectFit="cover" alt={alt} />
    </div>
  );
};

export default Image;
