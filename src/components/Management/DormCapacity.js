import React, { useEffect, useState } from 'react';
import classes from './DormCapacity.module.css';

import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../../graphql/queries';

const DormCapacity = ({ building, total }) => {
  const [occupied, setOccupied] = useState(0);

  const grabUsers = async () => {
    if (!building) return;
    try {
      const usersInThisBuilding = await API.graphql(
        graphqlOperation(listUsers, {
          filter: { dormbuilding: { eq: building } }
        })
      );
      setOccupied(usersInThisBuilding.data.listUsers.items.length || 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    grabUsers();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.building}>Bldg {building} Capacity</div>
      <div className={classes.occupancy}>
        {occupied}/{total}
      </div>
    </div>
  );
};

export default DormCapacity;
