import React from "react";
import classes from "./AdditionalInformation.module.css";

import ContentWrapper from "../../UI/ContentWrapper";

const AdditionalInformation = () => {
  const events = [
    {
      date: "June 16th",
      title: "Dorm dinner at 18:00 building 1657.",
    },
    {
      date: "June 19th",
      title: "Dorm dinner at 20:30 building 1657.",
    },
    {
      date: "June 25th",
      title: "Chaplain mentorship board at 16:00 building 1654.",
    },
    {
      date: "July 4th",
      title: "Dorm dinner at 18:00 building 1657.",
    },
    {
      date: "July 8th",
      title: "Dorm dinner at 18:00 building 1657.",
    },
  ];

  const baseContacts = [
    {
      name: "Family Readiness Center",
      phoneNumber: "301-981-5555",
    },
    {
      name: "Airmen Dorm Leader",
      phoneNumber: "301-981-5555",
    },
    {
      name: "Command Post",
      phoneNumber: "301-981-5555",
    },
    {
      name: "Dorm Office",
      phoneNumber: "301-981-5555",
    },
    {
      name: "Dorm Office",
      phoneNumber: "301-981-5555",
    },
  ];
  return (
    <ContentWrapper>
      <div className={classes.grid}>
        <div className={classes["grid-item"]}>
          <div className={classes["item-title"]}>Upcoming Events</div>
          {events.map((event, i) => (
            <div key={i} className={classes["item-row"]}>
              <span className={classes.bold}>{event.date}</span>
              <span className={classes.text}> - {event.title}</span>
            </div>
          ))}
        </div>
        <div className={classes["grid-item"]}>
          <div className={classes["item-title"]}>JBA Contacts</div>
          {baseContacts.map((contact, i) => (
            <div key={i} className={classes["item-row"]}>
              <span className={classes.bold}>{contact.name}</span>
              <span className={classes.text}> - {contact.phoneNumber}</span>
            </div>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default AdditionalInformation;
