import React from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers, listDormBuildings } from '../../../graphql/queries';
import Link from 'next/link';

import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import DormCapacity from '../../../components/Management/DormCapacity';
import DataTable from '../../../components/Management/DataTable';
import { Card, Icon } from '../../../components/UI/';

import ManagementLayout from '../../../layouts/management/default';

import classes from './index.module.css';

const DormsManagementPage = ({
  userName,
  listOfBuildings,
  listOfUnverifiedUsers,
  listOfVerifiedUsers,
  listOfStaff
}) => {
  const verifiedHeaders = [
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
    },
    {
      key: 'dormbuilding',
      value: 'Dorm Building'
    },
    {
      key: 'dormroom',
      value: 'Dorm Room'
    }
  ];
  const verifiedUsersList = listOfVerifiedUsers.map(user => ({
    ...user,
    name: (
      <Link href={`/management/dorms/resident/${user.email}`}>{user.name}</Link>
    )
  }));

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
  const unVerifiedUsersList = listOfUnverifiedUsers.map(user => ({
    ...user,
    name: (
      <Link href={`/management/dorms/resident/${user.email}`}>{user.name}</Link>
    )
  }));

  const buildingHeaders = [
    {
      key: 'building',
      value: 'Building'
    },
    {
      key: 'capacity',
      value: 'Capacity'
    }
  ];

  const buildingList = listOfBuildings.map(building => {
    return {
      ...building,
      building: (
        <Link href={`/management/dorms/buildings/${building.building}`}>
          {String(building.building)}
        </Link>
      )
    };
  });

  const staffHeaders = [
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
  const staffList = listOfStaff.map(staff => ({
    ...staff,
    name: (
      <Link href={`/management/dorms/staff/${staff.email}`}>{staff.name}</Link>
    )
  }));

  return (
    <ManagementLayout userName={userName}>
      <div className={classes.title}>Dorms Management</div>
      <div className={classes.occupancy}>
        {listOfBuildings.map(building => (
          <DormCapacity
            key={building.id}
            building={building.building}
            total={building.capacity}
          />
        ))}
      </div>
      <div className={classes.tables}>
        <Card title="Current Residents" icon="peopleSharp">
          <DataTable
            headers={verifiedHeaders}
            data={verifiedUsersList}
            preview
          />
          {verifiedUsersList?.length && (
            <div className={classes.more}>
              <Link href="/management/dorms/resident">
                <a className={classes['more-link']}>
                  View all{' '}
                  <Icon name="arrowRightAltFilled" color="currentColor" />
                </a>
              </Link>
            </div>
          )}
        </Card>
        <Card title="Verification Needed" icon="checkBoxSharp">
          <DataTable
            headers={unverifiedHeaders}
            data={unVerifiedUsersList}
            preview
          />
          {unVerifiedUsersList?.length && (
            <div className={classes.more}>
              <Link href="/management/dorms/resident">
                <a className={classes['more-link']}>
                  View all{' '}
                  <Icon name="arrowRightAltFilled" color="currentColor" />
                </a>
              </Link>
            </div>
          )}
        </Card>
        <Card title="Current Buildings" icon="warehouseSharp">
          <DataTable data={buildingList} headers={buildingHeaders} preview />
          {buildingList?.length && (
            <div className={classes.more}>
              <Link href="/management/dorms/buildings">
                <a className={classes['more-link']}>
                  View all{' '}
                  <Icon name="arrowRightAltFilled" color="currentColor" />
                </a>
              </Link>
            </div>
          )}
        </Card>
        <Card title="Current Staff" icon="emojiPeopleSharp">
          <DataTable data={staffList} headers={staffHeaders} preview />
          {staffList?.length && (
            <div className={classes.more}>
              <Link href="/management/dorms/staff/">
                <a className={classes['more-link']}>
                  View all{' '}
                  <Icon name="arrowRightAltFilled" color="currentColor" />
                </a>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </ManagementLayout>
  );
};

export const getServerSideProps = async context => {
  const { Auth, API } = withSSRContext(context);
  let props = {};

  // Check Auth
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

  // Get building Data
  const buildingData = await API.graphql(graphqlOperation(listDormBuildings));
  const buildings = buildingData.data.listDormBuildings.items.filter(
    b => !b._deleted
  );
  props.listOfBuildings = buildings.map(building => ({
    id: building.id,
    building: building.dormbuilding,
    capacity: building.capacity
  }));

  // Get verified/ unverified users
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
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dormbuilding: user.dormbuilding || '',
      dormroom: user.dormroom || ''
    };
  });

  const unverifiedUsersData = await API.graphql(
    graphqlOperation(listUsers, {
      filter: {
        and: [{ verified: { eq: false } }, { userType: { eq: 'dorm' } }]
      }
    })
  );

  const unverifiedUsers = unverifiedUsersData.data.listUsers.items;
  props.listOfUnverifiedUsers = unverifiedUsers.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    };
  });

  // Get Staff

  const staffData = await API.graphql(
    graphqlOperation(listUsers, {
      filter: {
        and: [{ userType: { eq: 'dormstaff' } }, { verified: { eq: true } }]
      }
    })
  );
  const listOfStaff = staffData.data.listUsers.items;
  props.listOfStaff = listOfStaff.map(staff => {
    return {
      id: staff.id,
      name: staff.name,
      email: staff.email,
      phone: staff.phone
    };
  });

  return {
    props: props
  };
};

export default DormsManagementPage;
