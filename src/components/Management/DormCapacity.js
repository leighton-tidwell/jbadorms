import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../../graphql/queries';
import { Icon } from '../UI';
import { useRouter } from 'next/router';
import classes from './DormCapacity.module.css';

const DormCapacity = ({ building, total }) => {
  const [occupied, setOccupied] = useState(0);
  const router = useRouter();

  const grabUsers = () => {
    if (!building) return;

    API.graphql(
      graphqlOperation(listUsers, {
        filter: { dormbuilding: { eq: building } }
      })
    )
      .then(data => {
        setOccupied(data.data.listUsers.items.length || 0);
      })
      .catch(error => console.error(error));
  };

  const goToBuildingLink = () => {
    router.push(`/management/dorms/building/${building}`);
  };

  grabUsers();

  return (
    <div className={classes.container}>
      <div className={classes.building}>Bldg {building} Capacity</div>
      <div className={classes.occupancy}>
        {occupied}/{total}
      </div>
      <div className={classes.view} onClick={goToBuildingLink}>
        <Icon size="18" name="openInNewSharp" color="currentColor" />
      </div>
    </div>
  );
};

export default DormCapacity;
