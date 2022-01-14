import React from 'react';
import Subtitle from '../components/UI/Subtitle';
import Link from 'next/link';

const Error404 = () => {
  return (
    <>
      <Subtitle>This page was not found.&nbsp;</Subtitle>
      <div style={{ textAlign: 'center' }}>
        <Link href="/">
          <a style={{ color: 'white' }}>Go back home</a>
        </Link>
      </div>
    </>
  );
};

export default Error404;
