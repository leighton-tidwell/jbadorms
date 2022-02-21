import React from 'react';
import Link from 'next/link';
import { Icon } from '../';
import classes from './NavigationDropDown.module.css';

const NavigationDropDown = props => {
  return (
    <div className={classes['dropdown']}>
      <div className={classes['navigation-link']}>
        {props.linkAndDropDownLinks.text}{' '}
        <Icon size="25" name="arrowDropDownFilled" />
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
