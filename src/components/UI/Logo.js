import React from 'react';
import Link from 'next/link';

import classes from './Logo.module.css';

const Logo = props => {
  return (
    <div className={classes.logo}>
      <Link href={props.logoLink}>
        <a className={classes['logo-link']}>{props.logo}</a>
      </Link>
    </div>
  );
};

export default Logo;
