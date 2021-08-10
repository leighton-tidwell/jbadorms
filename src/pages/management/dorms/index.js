import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
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
      const newBuildingList = buildings.map(building => ({
        building: building.dormbuilding,
        capacity: building.capacity
      }));
      setBuildingList(newBuildingList);
    } catch (error) {
      console.error(error);
    }
  };

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
    fetchBuildings();
  }, []);

  return (
    <ManagementLayout userName={userName}>
      <div className={classes.title}>Dorms Management</div>
      <div className={classes.occupancy}>
        {buildingList.map(building => (
          <DormCapacity
            key={uuid()}
            building={building.building}
            total={building.capacity}
          />
        ))}
      </div>
      <div className={classes.tables}>
        <ResidentsTable
          title="Current Residents"
          image="/images/management/residents.svg"
          data={usersList}
          type="resident"
          showMore
        />
        <ResidentsTable
          title="Verification Needed"
          image="/images/management/verification.svg"
          data={verifiedUsersList}
          type="resident"
          showMore
        />
      </div>
      <div className={classes.tables}>
        <ResidentsTable
          title="Current Buildings"
          image="/images/management/dorms_active.svg"
          data={buildingList}
          type="building"
          showMore
        />
        <ResidentsTable
          title="Unnecessary Table"
          image="/images/management/verification.svg"
          data={[]}
          showMore
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
