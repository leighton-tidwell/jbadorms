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

const ResidentPage = ({ userName }) => {
  const [usersList, setUsersList] = useState([]);
  const [verifiedUsersList, setVerifiedUsersList] = useState([]);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const userData = await API.graphql(
        graphqlOperation(listUsers, {
          filter: { verified: { eq: true } }
        })
      );
      const users = userData.data.listUsers.items;
      const newUsersList = users.map(user => {
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
      const verifiedUsersList = unverifiedUsers.map(user => {
        return {
          name: user.name,
          email: user.email,
          phone: user.phone
        };
      });
      setUsersList(newUsersList);
      setVerifiedUsersList(verifiedUsersList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
          data={usersList}
          type="resident"
        />
        <ResidentsTable
          title="Verification Needed"
          image="/images/management/verification.svg"
          data={verifiedUsersList}
          type="resident"
        />
      </div>
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
