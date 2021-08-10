import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import Link from 'next/link';
import { listDormBuildings } from '../../../../graphql/queries';
import {
  createDormBuildings,
  createDormRooms
} from '../../../../graphql/mutations';
import config from '../../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import ResidentsTable from '../../../../components/Management/ResidentsTable';
import ManagementLayout from '../../../../layouts/management/default';
import AddBuildingForm from '../../../../components/Management/AddBuildingForm';
import classes from './index.module.css';

const BuildingPage = ({ userName }) => {
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

  const addBuildingHandler = async (
    building,
    buildingCapacity,
    roomNumbers
  ) => {
    try {
      const newBuilding = {
        dormbuilding: building,
        capacity: buildingCapacity
      };

      const newBuildingState = {
        building: building,
        capacity: buildingCapacity
      };

      setBuildingList(prevList => [...prevList, newBuildingState]);

      const buildingData = await API.graphql(
        graphqlOperation(createDormBuildings, { input: newBuilding })
      );

      for (const room in roomNumbers) {
        const newRoom = {
          dormbuildingsID: buildingData.data.createDormBuildings.id,
          dormroom: roomNumbers[room]
        };
        const dormData = await API.graphql(
          graphqlOperation(createDormRooms, { input: newRoom })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  return (
    <ManagementLayout userName={userName}>
      <div className={classes['flex-title']}>
        <Link href="/management/dorms">
          <a className={classes.title}>Dorms Management</a>
        </Link>
        <div className={classes.subtitle}>/ Buildings</div>
      </div>
      <div className={classes.tables}>
        <AddBuildingForm onSubmit={addBuildingHandler} />
        <ResidentsTable
          title="Building List"
          image="/images/management/dorms_active.svg"
          data={buildingList}
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

export default BuildingPage;
