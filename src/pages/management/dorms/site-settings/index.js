import React, { useState } from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listFAQS, listEvents } from '../../../../graphql/queries';
import { createEvents, createFAQ } from '../../../../graphql/mutations';
import Link from 'next/link';

import config from '../../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import classes from './index.module.css';
import ManagementLayout from '../../../../layouts/management/default';
import AddFAQForm from '../../../../components/Management/AddFAQForm';
import AddEventsForm from '../../../../components/Management/AddEventsForm';
import ResidentsTable from '../../../../components/Management/ResidentsTable';

const SiteSettingsPage = ({ userName, faqsList, eventsList }) => {
  const [faqs, setFaqs] = useState(faqsList);
  const [events, setEvents] = useState(eventsList);

  const handleAddFaq = async faq => {
    const addFAQ = await API.graphql(
      graphqlOperation(createFAQ, { input: faq })
    );
    setFaqs(prevState => [...prevState, faq]);
  };

  const handleAddEvent = async event => {
    const addEvent = await API.graphql(
      graphqlOperation(createEvents, { input: event })
    );
    const newEvent = { event: event.title, date: event.date };
    setEvents(prevState => [...prevState, newEvent]);
  };

  return (
    <ManagementLayout userName={userName}>
      <div className={classes['flex-title']}>
        <Link href="/management/dorms">
          <a className={classes.title}>Dorms Management</a>
        </Link>
        <div className={classes.subtitle}>/ Site Settings</div>
      </div>
      <div className={classes.forms}>
        <AddFAQForm onSubmit={handleAddFaq} />
        <ResidentsTable
          image="/images/management/verification.svg"
          title="FAQS"
          data={faqs}
        />
      </div>
      <div className={classes.forms}>
        <AddEventsForm onSubmit={handleAddEvent} />
        <ResidentsTable
          image="/images/management/verification.svg"
          title="Events"
          data={events}
        />
      </div>
    </ManagementLayout>
  );
};

export const getServerSideProps = async context => {
  const { Auth, API } = withSSRContext(context);
  let props = {};

  // Get Auth
  try {
    const user = await Auth.currentAuthenticatedUser();
    const userGroups =
      user.signInUserSession.accessToken.payload['cognito:groups'];
    if (!userGroups.includes('staff') && !userGroups.includes('admin'))
      throw 'Invalid group';
    props.userName = user.attributes.name;
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const getFaqs = await API.graphql(graphqlOperation(listFAQS));
  props.faqsList = getFaqs.data.listFAQS.items.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));

  const getEvents = await API.graphql(graphqlOperation(listEvents));
  props.eventsList = getEvents.data.listEvents.items.map(event => ({
    event: event.title,
    date: event.date
  }));

  return {
    props: props
  };
};

export default SiteSettingsPage;
