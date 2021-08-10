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

const ResidentPage = ({ userName }) => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);

  const getUserInformation = async () => {
    if (!id) return;
    try {
      const userData = await API.graphql(
        graphqlOperation(listUsers, {
          filter: { email: { eq: id } }
        })
      );
      const selectedUser = userData.data.listUsers.items[0] || null;
      if (selectedUser) return setUserData(selectedUser);
    } catch (error) {
      console.error(error, 'error from userid');
    }
  };

  useEffect(() => {
    getUserInformation();
  }, []);

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
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
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

export default ResidentPage;
