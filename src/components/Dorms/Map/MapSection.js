import classes from './MapSection.module.css';
import { ContentWrapper, Icon } from '../../UI/';
import Map from './Map';

const MapSection = () => {
  return (
    <ContentWrapper flexDirection="column" className={classes.container}>
      <div className={classes.title}>Where to find us</div>
      <div className={classes.address}>
        <Icon name="pinDropFilled" />
        1657 Brookley Ave, Joint Base Andrews, Maryland 20762
      </div>
      <Map className={classes['map-container']} />
    </ContentWrapper>
  );
};

export default MapSection;
