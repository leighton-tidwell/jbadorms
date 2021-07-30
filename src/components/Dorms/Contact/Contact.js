import React from "react";
import uuid from "react-uuid";
import classes from "./Contact.module.css";

import ContentWrapper from "../../UI/ContentWrapper";

const Contact = () => {
  const contactInformation = [
    {
      id: uuid(),
      contactLocation: "Office",
      contactNumber: "301-981-5555",
    },
    {
      id: uuid(),
      contactLocation: "ADL",
      contactNumber: "301-981-5555",
    },
    {
      id: uuid(),
      contactLocation: "Emergency",
      contactNumber: "301-981-5555",
    },
  ];

  const hoursOfOperation = [
    {
      id: uuid(),
      day: "Monday",
      hours: "0900 - 1700",
    },
    {
      id: uuid(),
      day: "Tuesday",
      hours: "0900 - 1700",
    },
    {
      id: uuid(),
      day: "Wednesday",
      hours: "0900 - 1700",
    },
    {
      id: uuid(),
      day: "Thursday",
      hours: "0900 - 1700",
    },
    {
      id: uuid(),
      day: "Friday",
      hours: "0900 - 1700",
    },
    {
      id: uuid(),
      day: "Saturday",
      hours: "0900 - 1700",
    },
    {
      id: uuid(),
      day: "Sunday",
      hours: "0900 - 1700",
    },
  ];
  return (
    <div className={classes.container}>
      <ContentWrapper flexDirection="column">
        <div className={classes.title}>How to reach us</div>
        <div className={classes.flex}>
          <div className={classes["left-information"]}>
            {contactInformation.map((contactItem) => (
              <div key={contactItem.id} className={classes["contact-row"]}>
                <div className={classes["contact-title"]}>
                  {contactItem.contactLocation}:
                </div>
                <div className={classes["contact-item"]}>
                  {contactItem.contactNumber}
                </div>
              </div>
            ))}
          </div>
          <div className={classes["right-information"]}>
            {hoursOfOperation.map((hoursItem) => (
              <div key={hoursItem.id} className={classes["contact-row"]}>
                <div className={classes["contact-title"]}>{hoursItem.day}:</div>
                <div className={classes["contact-item"]}>{hoursItem.hours}</div>
              </div>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Contact;