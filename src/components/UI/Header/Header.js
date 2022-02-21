import classes from './Header.module.css';
import { Navigation, Logo } from '../';

const Header = ({ links, logoLink, logo }) => {
  return (
    <div className={classes['header-background']}>
      <div className={classes['header-container']}>
        <div className={classes.header}>
          <Logo logo={logo} logoLink={logoLink} />
          <Navigation links={links} />
        </div>
      </div>
    </div>
  );
};

export default Header;
