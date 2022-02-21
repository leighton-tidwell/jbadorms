import { NavLink } from '../';
import classes from './NavigationLink.module.css';

const NavigationLink = props => {
  return (
    <NavLink href={props.href} className={classes['navigation-link']}>
      {props.text}
    </NavLink>
  );
};

export default NavigationLink;
