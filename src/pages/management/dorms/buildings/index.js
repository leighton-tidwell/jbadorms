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

import { Card } from '../../../../components/UI/';
import DataTable from '../../../../components/Management/DataTable';
import ManagementLayout from '../../../../layouts/management/default';
import AddBuildingForm from '../../../../components/Management/AddBuildingForm';
import classes from './index.module.css';

const buildingHeaders = [
  {
    value: 'Building',
    key: 'dormbuilding'
  },
  {
    value: 'Capacity',
    key: 'capacity'
  }
];

const BuildingPage = ({ userName, listOfBuildings }) => {
  const [buildingList, setBuildingList] = useState(
    listOfBuildings.map(b => {
      const { dormbuilding } = b;
      return {
        ...b,
        dormbuilding: (
          <Link href={`/management/dorms/building/${dormbuilding}`}>
            {String(dormbuilding)}
          </Link>
        )
      };
    })
  );

  const addBuildingHandler = async (dormbuilding, capacity, roomNumbers) =>
    new Promise((resolve, reject) => {
      const newBuilding = {
        dormbuilding,
        capacity
      };

      API.graphql(graphqlOperation(createDormBuildings, { input: newBuilding }))
        .then(async data => {
          await Promise.all(
            roomNumbers.map(roomNumber => {
              const newRoom = {
                dormbuildingsID: data.data.createDormBuildings.id,
                dormroom: roomNumber
              };

              return API.graphql(
                graphqlOperation(createDormRooms, { input: newRoom })
              );
            })
          );

          setBuildingList(prevList => [
            ...prevList,
            {
              ...newBuilding,
              id: data.data.createDormBuildings.id,
              dormbuilding: (
                <Link href={`/management/dorms/building/${dormbuilding}`}>
                  {dormbuilding}
                </Link>
              )
            }
          ]);
          resolve('success');
        })
        .catch(error => {
          reject(error);
        });
    });

  return (
    <ManagementLayout userName={userName}>
      <div className={classes['title']}>Manage Buildings</div>
      <div className={classes.tables}>
        <Card title="Add a Building" icon="warehouseSharp">
          <AddBuildingForm onSubmit={addBuildingHandler} />
        </Card>
        <Card title="Building List" icon="warehouseSharp">
          <DataTable
            data={buildingList}
            headers={buildingHeaders}
            pagination
            searchPlaceholder="Search a building number..."
            filterableColumns={['dormbuilding']}
            search
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

  const buildingData = await API.graphql(graphqlOperation(listDormBuildings));
  const buildings = buildingData.data.listDormBuildings.items;
  props.listOfBuildings = buildings
    .filter(b => !b._deleted)
    .map(building => ({
      id: building.id,
      dormbuilding: building.dormbuilding,
      capacity: building.capacity
    }))
    .sort((a, b) => {
      if (a.dormbuilding < b.dormbuilding) return -1;
      if (a.dormbuilding > b.dormbuilding) return 1;
      return 0;
    });

  return { props: props };
};

export default BuildingPage;
