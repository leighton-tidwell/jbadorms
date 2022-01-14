import React, { useState, useEffect } from 'react';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../../../graphql/queries';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import classes from './AdditionalInformation.module.css';

import ContentWrapper from '../../UI/ContentWrapper';

const AdditionalInformation = () => {
  const [events, setEvents] = useState([]);
  // const events = [
  //   {
  //     date: "June 16th",
  //     title: "Dorm dinner at 18:00 building 1657.",
  //   },
  //   {
  //     date: "June 19th",
  //     title: "Dorm dinner at 20:30 building 1657.",
  //   },
  //   {
  //     date: "June 25th",
  //     title: "Chaplain mentorship board at 16:00 building 1654.",
  //   },
  //   {
  //     date: "July 4th",
  //     title: "Dorm dinner at 18:00 building 1657.",
  //   },
  //   {
  //     date: "July 8th",
  //     title: "Dorm dinner at 18:00 building 1657.",
  //   },
  // ];

  const baseContacts = [
    {
      name: 'Chapel',
      phoneNumber: '301-981-2111'
    },
    {
      name: 'Command Post',
      phoneNumber: '301-981-5058'
    },
    {
      name: 'Family Readiness Center',
      phoneNumber: '301-981-7087'
    },
    {
      name: 'Finance',
      phoneNumber: '240-612-3160'
    },
    {
      name: 'Medical Appointments',
      phoneNumber: '888-999-1212'
    }
  ];

  const fetchEvents = async () => {
    const fetchEvents = await API.graphql({
      query: listEvents,
      authMode: 'API_KEY'
    });
    const dateOptions = { month: 'long', day: 'numeric' };
    const eventsList = fetchEvents.data.listEvents.items
      .sort((first, second) => {
        const firstDate = new Date(first.date);
        const secondDate = new Date(second.date);
        if (firstDate < secondDate) return -1;
        if (firstDate < secondDate) return 1;
        return 0;
      })
      .map(event => ({
        title: event.title,
        date: new Date(event.date).toLocaleDateString('en-US', dateOptions)
      }));
    setEvents(eventsList);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <ContentWrapper>
      <div className={classes.grid}>
        <div className={classes['grid-item']}>
          <div className={classes['item-title']}>Upcoming Events</div>
          {events.length !== 0 &&
            events.map((event, i) => (
              <div key={i} className={classes['item-row']}>
                <span className={classes.bold}>{event.date}</span>
                <span className={classes.text}> - {event.title}</span>
              </div>
            ))}
          {events.length === 0 && (
            <div className={classes.none}>No events upcoming!</div>
          )}
        </div>
        <div className={classes['grid-item']}>
          <div className={classes['item-title']}>JBA Contacts</div>
          {baseContacts.map((contact, i) => (
            <div key={i} className={classes['item-row']}>
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
