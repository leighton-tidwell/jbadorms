import React from 'react';
import Link from 'next/link';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers } from '../../../../graphql/queries';
import config from '../../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import { Card } from '../../../../components/UI';
import DataTable from '../../../../components/Management/DataTable';
import ManagementLayout from '../../../../layouts/management/default';
import classes from './index.module.css';

const verifiedHeaders = [
  {
    value: 'Name',
    key: 'name'
  },
  {
    value: 'Email',
    key: 'email'
  },
  {
    value: 'Phone',
    key: 'phone'
  },
  {
    value: 'Building',
    key: 'dormbuilding'
  },
  {
    value: 'Room',
    key: 'dormroom'
  }
];

const unverifiedHeaders = [
  {
    key: 'name',
    value: 'Name'
  },
  {
    key: 'email',
    value: 'Email'
  },
  {
    key: 'phone',
    value: 'Phone'
  }
];

const ResidentPage = ({
  userName,
  listOfVerifiedUsers,
  listOfUnverifiedUsers
}) => {
  const verifiedList = listOfVerifiedUsers.map(user => ({
    ...user,
    name: (
      <Link href={`/management/dorms/resident/${user.email}`}>{user.name}</Link>
    )
  }));

  const unverifiedList = listOfUnverifiedUsers.map(user => ({
    ...user,
    name: (
      <Link href={`/management/dorms/resident/${user.email}`}>{user.name}</Link>
    )
  }));

  return (
    <ManagementLayout userName={userName}>
      <div className={classes['title']}>Manage Residents</div>
      <div className={classes.tables}>
        <Card title="Residents List" icon="peopleSharp">
          <DataTable
            headers={verifiedHeaders}
            data={verifiedList}
            pagination
            search
            filterableColumns={[
              'name',
              'email',
              'phone',
              'dormbuilding',
              'dormroom'
            ]}
          />
        </Card>
        <Card title="Verification Needed" icon="checkBoxSharp">
          <DataTable
            headers={unverifiedHeaders}
            data={unverifiedList}
            pagination
            search
            filterableColumns={['name', 'email', 'phone']}
          />
        </Card>
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

  const userData = await API.graphql(
    graphqlOperation(listUsers, {
      filter: {
        and: [{ verified: { eq: true } }, { userType: { eq: 'dorm' } }]
      }
    })
  );
  const users = userData.data.listUsers.items;
  props.listOfVerifiedUsers = users.map(user => {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      dormbuilding: user.dormbuilding,
      dormroom: user.dormroom
    };
  });

  const unverifiedUsersData = await API.graphql(
    graphqlOperation(listUsers, {
      and: [{ verified: { eq: false } }, { userType: { eq: 'dorm' } }]
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
