import { useState, useEffect } from 'react';
import Amplify, { API } from 'aws-amplify';
import { listEvents } from '../../../graphql/queries';
import classes from './AdditionalInformation.module.css';
import { ContentWrapper, Icon } from '../../UI/';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

const AdditionalInformation = () => {
  const [events, setEvents] = useState([]);

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
      .filter(b => !b._deleted)
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
          <div className={classes['item-title']}>
            <Icon name="calendarTodaySharp" />
            Upcoming Events
          </div>
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
          <div className={classes['item-title']}>
            <Icon name="phoneAndroidSharp" />
            JBA Contacts
          </div>
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
