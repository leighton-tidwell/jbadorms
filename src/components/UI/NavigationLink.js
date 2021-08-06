import React from 'react';


import classes from './NavigationLink.module.css';
import NavLink from './NavLink';

const NavigationLink = props => {
  return (
    <NavLink href={props.href} className={classes['navigation-link']}>
      {props.text}
    </NavLink>
  );
};

export default NavigationLink;
