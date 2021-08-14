import React from 'react';
import Link from 'next/link';

import classes from './NavigationDropDown.module.css';

const NavigationDropDown = props => {
  const arrowDown = '/images/arrow-down.svg';
  return (
    <div className={classes['dropdown']}>
      <div className={classes['navigation-link']}>
        {props.linkAndDropDownLinks.text}{' '}
        <img
          className={classes.arrow}
          src={arrowDown}
          alt="show sub navigation items"
        />
      </div>
      <div className={classes['dropdown-content']}>
        {props.linkAndDropDownLinks.dropdown.map(dropdownLink => (
          <Link key={dropdownLink.id} href={dropdownLink.href}>
            <a className={classes['dropdown-link']}>{dropdownLink.text}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigationDropDown;
