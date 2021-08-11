import React from 'react';
import { withSSRContext } from 'aws-amplify';

import ManagementLayout from '../../layouts/management/default';

const ManagementPage = ({ userName }) => {
  return (
    <ManagementLayout userName={userName}>
      Select a department from the left to start.
    </ManagementLayout>
  );
};

export const getServerSideProps = async context => {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    const userGroups =
      user.signInUserSession.accessToken.payload['cognito:groups'];
    if (!userGroups.includes('staff') && !userGroups.includes('admin'))
      throw 'Invalid group';
    return {
      props: {
        userName: user.attributes.name
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
};

export default ManagementPage;
