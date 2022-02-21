import classes from './ImageBanner.module.css';
import { ContentWrapper } from '../';

const ImageBanner = props => {
  return (
    <div
      className={classes.container}
      style={{ background: `url(${props.backgroundImage})` }}
    >
      <ContentWrapper>
        <div className={classes.hero}>
          <h2>{props.heroText}</h2>
          <h3>{props.heroSubText}</h3>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ImageBanner;
