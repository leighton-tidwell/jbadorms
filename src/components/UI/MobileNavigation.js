import React, { useLayoutEffect } from 'react';

import classes from './MobileNavigation.module.css';
import MobileNavigationLink from './MobileNavigationLink';
import MobileDropDownLink from './MobileDropDownLink';

const MobileNavigation = ({ links, navigationHandler, hamburgerMenu }) => {
  useLockBodyScroll();
  const generateMobileNavLinks = link => {
    if (link.dropdown) return <MobileDropDownLink key={link.id} links={link} />;
    return (
      <MobileNavigationLink key={link.id} href={link.href}>
        {link.text}
      </MobileNavigationLink>
    );
  };

  return (
    <div className={classes.overlay}>
      <div className={classes['mobile-navigation']}>
        <div className={classes['mobile-nav-header']}>
          <div className={classes['mobile-nav-title']}>Navigation</div>
          <img
            onClick={navigationHandler}
            className={classes['mobile-nav-toggle']}
            alt="Hamburger menu"
            src={hamburgerMenu}
          />
        </div>
        <div className={classes.scroll}>
          {links.map(link => {
            return generateMobileNavLinks(link);
          })}
        </div>
      </div>
    </div>
  );
};

const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
};

export default MobileNavigation;
