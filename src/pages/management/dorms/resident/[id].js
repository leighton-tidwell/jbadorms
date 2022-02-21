import React, { useState } from 'react';
import { listUsers } from '../../../../graphql/queries';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import config from '../../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import classes from './[id].module.css';
import ManagementLayout from '../../../../layouts/management/default';
import ResidentForm from '../../../../components/Management/ResidentForm';
import { Card } from '../../../../components/UI';

const ResidentPage = ({ userName, id, selectedUserData }) => {
  const [userData, setUserData] = useState(selectedUserData);

  return (
    <ManagementLayout userName={userName}>
      <div className={classes['title']}>
        {selectedUserData?.userType === 'dorm'
          ? 'Manage Resident'
          : 'Manage Staff'}
        <div className={classes.subtitle}>{selectedUserData.name}</div>
      </div>
      <div className={classes.tables}>
        <Card
          title={
            selectedUserData?.userType === 'dorm'
              ? 'Resident Information'
              : 'Staff Information'
          }
          icon="peopleSharp"
        >
          <ResidentForm data={userData} />
        </Card>
      </div>
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

  if (userData.data.listUsers.items.length === 0)
    return {
      redirect: { destination: '/management/dorms/residents', permanent: false }
    };

  props.selectedUserData = userData.data.listUsers.items[0];

  return { props: props };
};

export default ResidentPage;
