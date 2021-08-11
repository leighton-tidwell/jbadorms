import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { listUsers } from '../../../../graphql/queries';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import config from '../../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import classes from './[id].module.css';
import ManagementLayout from '../../../../layouts/management/default';
import ResidentForm from '../../../../components/Management/ResidentForm';

const ResidentPage = ({ userName, id, selectedUserData }) => {
  const [userData, setUserData] = useState(selectedUserData);

  return (
    <ManagementLayout userName={userName}>
      <div className={classes['flex-title']}>
        <Link href="/management/dorms">
          <a className={classes.title}>Dorms Management</a>
        </Link>
        <div className={classes.subtitle}>
          /
          <Link href="/management/dorms/resident">
            <a className={classes['subtitle-link']}>Residents</a>
          </Link>{' '}
          / {id}
        </div>
      </div>
      {userData && <ResidentForm data={userData} />}
    </ManagementLayout>
  );
};

export const getServerSideProps = async context => {
  const { Auth, API } = withSSRContext(context);
  const id = context.query.id;
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

  if (!id)
    return { redirect: { destination: '/management/dorms', permanent: false } };

  const userData = await API.graphql(
    graphqlOperation(listUsers, {
      filter: { email: { eq: id } }
    })
  );
  props.selectedUserData = userData.data.listUsers.items[0] || null;
  props.id = id;

  return { props: props };
};

export default ResidentPage;
