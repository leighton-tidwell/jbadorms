import React, { useState } from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listFAQS, listEvents } from '../../../../graphql/queries';
import {
  createEvents,
  createFAQ,
  deleteFAQ,
  deleteEvents
} from '../../../../graphql/mutations';
import Link from 'next/link';

import config from '../../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import { Card, Icon, ConfirmModal } from '../../../../components/UI/';
import classes from './index.module.css';
import ManagementLayout from '../../../../layouts/management/default';
import AddFAQForm from '../../../../components/Management/AddFAQForm';
import AddEventsForm from '../../../../components/Management/AddEventsForm';
import DataTable from '../../../../components/Management/DataTable';
import dayjs from 'dayjs';

const eventHeaders = [
  {
    key: 'title',
    value: 'Event'
  },
  {
    key: 'date',
    value: 'Date'
  },
  {
    key: 'delete',
    value: 'Delete'
  }
];

const faqHeaders = [
  {
    key: 'question',
    value: 'Question'
  },
  {
    key: 'answer',
    value: 'Answer'
  },
  {
    key: 'delete',
    value: 'Delete'
  }
];

const SiteSettingsPage = ({ userName, faqsList, eventsList }) => {
  const [showDeleteFAQModal, setShowDeleteFAQModal] = useState(false);
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const [deleteObject, setDeleteObject] = useState({});
  const [faqs, setFaqs] = useState(
    faqsList.map(faq => ({
      ...faq,
      delete: (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setShowDeleteFAQModal(true);
            setDeleteObject(faq);
          }}
        >
          <Icon name="deleteForeverSharp" />
        </span>
      )
    }))
  );
  const [events, setEvents] = useState(
    eventsList.map(event => ({
      ...event,
      delete: (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setShowDeleteEventModal(true);
            setDeleteObject(event);
          }}
        >
          <Icon name="deleteForeverSharp" />
        </span>
      )
    }))
  );

  const handleAddFaq = faq =>
    new Promise((resolve, reject) => {
      API.graphql(graphqlOperation(createFAQ, { input: faq }))
        .then(data => {
          setFaqs(prevState => [
            ...prevState,
            {
              ...data.data.createFAQ,
              delete: (
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowDeleteEventModal(true);
                    setDeleteObject(data.data.createFAQ);
                  }}
                >
                  <Icon name="deleteForeverSharp" />
                </span>
              )
            }
          ]);
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });

  const handleAddEvent = event =>
    new Promise((resolve, reject) => {
      API.graphql(graphqlOperation(createEvents, { input: event }))
        .then(data => {
          setEvents(prevState => [
            ...prevState,
            {
              ...data.data.createEvents,
              delete: (
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowDeleteEventModal(true);
                    setDeleteObject(data.data.createEvents);
                  }}
                >
                  <Icon name="deleteForeverSharp" />
                </span>
              )
            }
          ]);
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });

  const handleDeleteFAQ = () => {
    const { id, _version } = deleteObject;
    API.graphql(graphqlOperation(deleteFAQ, { input: { id, _version } })).then(
      () => {
        setShowDeleteFAQModal(false);
        setDeleteObject(null);
        setFaqs(prevState => prevState.filter(faq => faq.id !== id));
      }
    );
  };

  const handleDeleteEvent = () => {
    const { id, _version } = deleteObject;
    API.graphql(
      graphqlOperation(deleteEvents, { input: { id, _version } })
    ).then(() => {
      setShowDeleteEventModal(false);
      setDeleteObject(null);
      setEvents(prevState => prevState.filter(event => event.id !== id));
    });
  };

  return (
    <>
      <ConfirmModal
        show={showDeleteFAQModal}
        onConfirm={handleDeleteFAQ}
        onCancel={() => setShowDeleteFAQModal(false)}
        message="Are you sure you want to delete this FAQ?"
      />
      <ConfirmModal
        show={showDeleteEventModal}
        onConfirm={handleDeleteEvent}
        onCancel={() => setShowDeleteEventModal(false)}
        message="Are you sure you want to delete this event?"
      />
      <ManagementLayout userName={userName}>
        <div className={classes['title']}>Manage Residents</div>
        <div className={classes.tables}>
          <Card icon="checkBoxSharp" title="Add an FAQ">
            <AddFAQForm onSubmit={handleAddFaq} />
          </Card>
          <Card icon="checkBoxSharp" title="FAQS">
            <DataTable data={faqs} headers={faqHeaders} pagination />
          </Card>
          <Card icon="checkBoxSharp" title="Add an Event">
            <AddEventsForm onSubmit={handleAddEvent} />
          </Card>
          <Card icon="checkBoxSharp" title="Events">
            <DataTable data={events} headers={eventHeaders} pagination />
          </Card>
        </div>
      </ManagementLayout>
    </>
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
  props.faqsList = getFaqs.data.listFAQS.items.filter(b => !b._deleted);

  const getEvents = await API.graphql(graphqlOperation(listEvents));
  props.eventsList = getEvents.data.listEvents.items
    .filter(b => !b._deleted)
    .sort((a, b) => {
      if (dayjs(a.date).isAfter(dayjs(b.date))) return 1;
      if (dayjs(a.date).isBefore(dayjs(b.date))) return -1;
      return 0;
    });

  return {
    props: props
  };
};

export default SiteSettingsPage;
