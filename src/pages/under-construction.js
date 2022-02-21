import React from 'react';
import Link from 'next/link';

import classes from './under-construction.module.css';
import { Button } from '../components/UI/';

const UnderConstructionPage = () => {
  return (
    <div className={classes.center}>
      <div className={classes.container}>
        <div className={classes.align}>
          <div className={classes.title}>JBA MHO</div>
          <div className={classes.subtitle}>
            This page is under construction...
          </div>
          <div className={classes.link}>
            <Link href="/">
              <a className={classes.href}>
                <Button>Click here to go back home</Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
