import { useState } from 'react';
import {
  MobileNavigation,
  NavigationLink,
  NavigationDropDown,
  Icon
} from '../';
import classes from './Navigation.module.css';

const Navigation = ({ links }) => {
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
        <Icon size="32" name="menuSharp" />
      </div>
      <div className={classes.navigation}>
        {links.map(link => {
          return generateNavLinks(link);
        })}
      </div>
      {navigationStatus && (
        <MobileNavigation links={links} navigationHandler={navigationHandler} />
      )}
    </>
  );
};

export default Navigation;
