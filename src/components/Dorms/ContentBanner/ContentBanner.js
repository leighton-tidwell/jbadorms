import classes from './ContentBanner.module.css';
import { ContentWrapper } from '../../UI/';

const ContentBanner = () => {
  return (
    <div className={classes.background}>
      <ContentWrapper>
        <div className={classes.title}>Additional Information</div>
      </ContentWrapper>
    </div>
  );
};

export default ContentBanner;
