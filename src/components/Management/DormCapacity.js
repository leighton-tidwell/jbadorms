import React from 'react';
import classes from './DormCapacity.module.css';

const DormCapacity = ({ building, occupied, total }) => {
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
