import { Icon } from '../';
import classes from './Card.module.css';

const Card = ({ title, icon, children, containerStyle, extraHeader }) => {
  return (
    <div className={classes.container} style={containerStyle}>
      <div className={classes.title}>
        <Icon name={icon} />
        <div className={classes.title_text}>{title}</div>
        <div className={classes.extra_header}>{extraHeader}</div>
      </div>
      {children}
    </div>
  );
};

export default Card;
