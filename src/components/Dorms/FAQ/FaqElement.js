import React from 'react';

import classes from './FaqElement.module.css';

const FaqElement = ({ question, answer }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Q: {question}</div>
      <div className={classes.answer}>A: {answer}</div>
    </div>
  );
};

export default FaqElement;
