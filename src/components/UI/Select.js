import React, { useState, useRef } from 'react';
import { useClickAway } from 'react-use';

import classes from './Select.module.css';

const Select = props => {
  const arrowDown = '/images/arrow-down.svg';
  const arrowUp = '/images/arrow-up.svg';
  const [options, setOptions] = useState({
    items: props.options,
    showItems: false,
    selectedItem: props.options && props.options[0]
  });

  const handleDropDown = () => {
    setOptions(prevState => ({
      ...prevState,
      showItems: !options.showItems
    }));
  };

  const handleSelectItem = item => {
    setOptions(prevState => ({
      ...prevState,
      showItems: false,
      selectedItem: item
    }));
    props.onSelect(item.value);
  };

  const ref = useRef(null);
  useClickAway(ref, () => {
    setOptions(prevState => ({
      ...prevState,
      showItems: false
    }));
  });

  return (
    <div
      className={`${classes.container} ${props.className && props.className}`}
      ref={ref}
    >
      <div
        onClick={handleDropDown}
        className={classes['select-visible-container']}
      >
        <div className={classes['selected-item']}>
          {options.selectedItem.value}
        </div>
        <div className={classes['select-arrow']}>
          {options.showItems ? (
            <img alt="arrow up" src={arrowUp} />
          ) : (
            <img alt="arrow down" src={arrowDown} />
          )}
        </div>
      </div>

      <div
        style={{ display: options.showItems ? 'block' : 'none' }}
        className={classes['select-items']}
      >
        {props.options.map(item => (
          <div
            key={item.id}
            onClick={() => handleSelectItem(item)}
            className={options.selectedItem === item ? 'selected' : ''}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
