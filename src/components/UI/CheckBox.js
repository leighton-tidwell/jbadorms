import React, { useState } from 'react';

import classes from './CheckBox.module.css';

const CheckBox = ({ className, onCheck }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    onCheck(!checked);
    setChecked(prevState => !prevState);
  };

  return (
    <div className={classes.container}>
      <div
        className={`${classes['visible-checkbox']} ${className && className}`}
        style={{ background: checked ? '#1d7dcf' : '#122536' }}
        onClick={handleCheck}
      ></div>
      <input type="checkbox" checked={checked} className={classes.checkbox} />
    </div>
  );
};

export default CheckBox;
