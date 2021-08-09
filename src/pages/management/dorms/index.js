import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers, listDormBuildings } from '../../../graphql/queries';

import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import DormCapacity from '../../../components/Management/DormCapacity';
import ResidentsTable from '../../../components/Management/ResidentsTable';

import ManagementLayout from '../../../layouts/management/default';

import classes from './index.module.css';

const DormsManagementPage = ({ userName }) => {
  const [usersList, setUsersList] = useState([]);
  const [verifiedUsersList, setVerifiedUsersList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);

  const fetchBuildings = async () => {
    try {
      const buildingData = await API.graphql(
        graphqlOperation(listDormBuildings)
      );
      const buildings = buildingData.data.listDormBuildings.items;
      setBuildingList(buildings);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers));
      const users = userData.data.listUsers.items;
      const newUsersList = users
        .filter(user => user.verified === true)
        .map(user => {
          const newUser = {
            email: user.email,
            name: user.name,
            phone: user.phone,
            dormbuilding: user.dormbuilding || '',
            dormroom: user.dormroom || ''
          };
          return newUser;
        });

      const verifiedUsersList = users
        .filter(user => user.verified === false)
        .map(user => {
          const newUser = {
            name: user.name,
            email: user.email,
            phone: user.phone
          };
          return newUser;
        });
      setUsersList(newUsersList);
      setVerifiedUsersList(verifiedUsersList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBuildings();
  }, []);

  return (
    <ManagementLayout userName={userName}>
      <div className={classes.title}>Dorms Management</div>
      <div className={classes.occupancy}>
        {buildingList.map(building => (
          <DormCapacity
            key={building.id}
            buildling={building.dormbuilding}
            total={building.capacity}
            occupied="100"
          />
        ))}
      </div>
      <div className={classes.tables}>
        <ResidentsTable
          title="Current Residents"
          image="/images/management/residents.svg"
          data={usersList}
        />
        <ResidentsTable
          title="Verification Needed"
          image="/images/management/verification.svg"
          data={verifiedUsersList}
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

export default DormsManagementPage;
