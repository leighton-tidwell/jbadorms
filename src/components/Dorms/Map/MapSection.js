import React from 'react';

import classes from './MapSection.module.css';
import ContentWrapper from '../../UI/ContentWrapper';
import Map from './Map';

const MapSection = () => {
  const coordinates = [38.81312537777073, -76.88516974829602];
  return (
    <div className={classes.background}>
      <ContentWrapper flexDirection="column" className={classes.container}>
        <div className={classes.title}>Where to find us</div>
        <div className={classes.address}>
          1657 Brookley Ave, Joint Base Andrews, Maryland 20762
        </div>
        <Map
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%`, width: '80%' }} />}
          containerElement={
            <div
              style={{ height: `400px`, width: `100%`, marginBottom: '2em' }}
            />
          }
          mapElement={
            <div
              className={classes['map-container']}
              style={{ height: `100%` }}
            />
          }
          lat={coordinates[0]}
          lng={coordinates[1]}
        />
      </ContentWrapper>
    </div>
  );
};

export default MapSection;
