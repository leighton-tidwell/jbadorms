import { ContentWrapper } from '../';
import classes from './Subtitle.module.css';

const Subtitle = props => {
  return (
    <ContentWrapper>
      <div className={classes.container}>
        <div className={classes.title}>{props.children}</div>
      </div>
    </ContentWrapper>
  );
};

export default Subtitle;
