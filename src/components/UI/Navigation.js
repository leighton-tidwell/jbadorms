import React, { useState, useLayoutEffect } from 'react';
import classes from './Navigation.module.css';

import NavigationLink from './NavigationLink';
import NavigationDropDown from './NavigationDropDown';
import MobileNavigation from './MobileNavigation';

const Navigation = ({ links }) => {
  const hamburgerMenu = '/images/hamburger_menu.svg';
  const [navigationStatus, setNavigationStatus] = useState(false);

  const navigationHandler = () => {
    setNavigationStatus(previousState => !previousState);
  };

  const generateNavLinks = link => {
    if (link.dropdown)
      return <NavigationDropDown key={link.id} linkAndDropDownLinks={link} />;
    return <NavigationLink key={link.id} href={link.href} text={link.text} />;
  };

  return (
    <>
      <div
        onClick={navigationHandler}
        className={classes['mobile-navigation-handler']}
      >
        <img alt="Hamburger menu" src={hamburgerMenu} />
      </div>
      <div className={classes.navigation}>
        {links.map(link => {
          return generateNavLinks(link);
        })}
      </div>
      {navigationStatus && (
        <MobileNavigation
          links={links}
          navigationHandler={navigationHandler}
          hamburgerMenu={hamburgerMenu}
        />
      )}
    </>
  );
};

export default Navigation;
