import React from 'react';
import Link from 'next/link';

import classes from './LinkElement.module.css';

const LinkElement = props => {
  return (
    <Link href={props.href}>
      <a className={classes['link-element']}>
        <img alt="" className={classes.image} src={props.bgImage} />
        <span className={classes.text}>{props.children}</span>
      </a>
    </Link>
  );
};

export default LinkElement;
