import React from "react";

import classes from "./MapSection.module.css";
import ContentWrapper from "../UI/ContentWrapper";
import Map from "./Map";

const MapSection = () => {
  const coordinates = [38.81312537777073, -76.88516974829602];
  return (
    <ContentWrapper flexDirection="column" className={classes.container}>
      <div className={classes.title}>Where to find us</div>
      <div className={classes.address}>
        1657 Brookley Ave, Joint Base Andrews, Maryland 20762
      </div>
      <Map
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3HvlWq71ENiR4riR5EED9LEbG8_ZzpTM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div
            style={{ height: `400px`, width: `100%`, marginBottom: "2em" }}
          />
        }
        mapElement={<div style={{ height: `100%` }} />}
        lat={coordinates[0]}
        lng={coordinates[1]}
      />
    </ContentWrapper>
  );
};

export default MapSection;
