import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import Link from 'next/link';
import { listUsers } from '../../../../graphql/queries';
import config from '../../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import ResidentsTable from '../../../../components/Management/ResidentsTable';
import ManagementLayout from '../../../../layouts/management/default';
import classes from './index.module.css';

const ResidentPage = ({
  userName,
  listOfVerifiedUsers,
  listOfUnverifiedUsers
}) => {
  const [verifiedUsersList, setVerifiedUsersList] = useState(
    listOfVerifiedUsers || []
  );
  const [unVerifiedUsersList, setunVerifiedUsersList] = useState(
    listOfUnverifiedUsers || []
  );
  const router = useRouter();

  return (
    <ManagementLayout userName={userName}>
      <div className={classes['flex-title']}>
        <Link href="/management/dorms">
          <a className={classes.title}>Dorms Management</a>
        </Link>
        <div className={classes.subtitle}>/ Residents</div>
      </div>
      <div className={classes.tables}>
        <ResidentsTable
          title="Residents List"
          image="/images/management/residents.svg"
          data={verifiedUsersList}
          type="resident"
        />
        <ResidentsTable
          title="Verification Needed"
          image="/images/management/verification.svg"
          data={unVerifiedUsersList}
          type="resident"
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

  // Get Users
  const userData = await API.graphql(
    graphqlOperation(listUsers, {
      filter: { verified: { eq: true } }
    })
  );
  const users = userData.data.listUsers.items;
  props.listOfVerifiedUsers = users.map(user => {
    return {
      email: user.email,
      name: user.name,
      phone: user.phone,
      dormbuilding: user.dormbuilding || '',
      dormroom: user.dormroom || ''
    };
  });

  const unverifiedUsersData = await API.graphql(
    graphqlOperation(listUsers, {
      filter: { verified: { eq: false } }
    })
  );

  const unverifiedUsers = unverifiedUsersData.data.listUsers.items;
  props.listOfUnverifiedUsers = unverifiedUsers.map(user => {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone
    };
  });

  return {
    props: props
  };
};

export default ResidentPage;
