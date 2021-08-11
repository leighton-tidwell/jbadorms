import React from 'react';

import classes from './AlertBox.module.css';

const AlertBox = ({ title, message }) => {
  return (
    <div className={classes.container}>
      <div className={classes['title-container']}>
        <img src="/images/alert.svg" className={classes.icon} />
        <div className={classes.title}>{title}</div>
      </div>
      <div className={classes.body}>{message}</div>
    </div>
  );
};

export default AlertBox;
