import { useState, useEffect } from 'react';
import classes from './CheckBox.module.css';

const CheckBox = ({ className, onCheck, name, value }) => {
  const [checked, setChecked] = useState(value || false);

  const handleCheck = () => {
    if (name) onCheck({ target: { name, value: !checked } });
    else onCheck(!checked);
    setChecked(prevState => !prevState);
  };

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <div className={classes.container}>
      <div
        className={`${classes['visible-checkbox']} ${className && className}`}
        style={{ background: checked ? '#1d7dcf' : '#122536' }}
        onClick={handleCheck}
      ></div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}}
        name={name}
        className={classes.checkbox}
      />
    </div>
  );
};

export default CheckBox;
