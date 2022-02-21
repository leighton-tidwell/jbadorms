import { useState } from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import {
  getDormBuildings,
  getUsers,
  listDormBuildings
} from '../../../../graphql/queries';
import {
  deleteDormBuildings,
  deleteDormRooms,
  createDormRooms,
  updateDormBuildings
} from '../../../../graphql/mutations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import {
  Card,
  Button,
  Icon,
  ConfirmModal,
  Modal,
  DynamicModal
} from '../../../../components/UI/';
import DataTable from '../../../../components/Management/DataTable';
import ManagementLayout from '../../../../layouts/management/default';
import classes from './[id].module.css';

const roomsHeaders = [
  {
    value: 'Room #',
    key: 'dormroom'
  },
  {
    value: 'Resident',
    key: 'dormresident'
  },
  {
    value: 'Delete',
    key: 'delete'
  }
];

const addRoomForm = [
  {
    type: 'text',
    name: 'dormroom',
    label: 'Room #'
  }
];

const BuildingPage = ({
  userName,
  id,
  building,
  capacity,
  listOfRooms,
  _version
}) => {
  const router = useRouter();
  const [accurateCapacity, setAccurateCapacity] = useState(capacity);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDeleteObject, setCurrentDeleteObject] = useState({});
  console.log(listOfRooms);

  const [roomList, setRoomList] = useState(
    listOfRooms.map(r => ({
      ...r,
      dormresident: r.dormresident?.data ? (
        <Link
          href={`/management/dorms/resident/${r.dormresident.data.getUsers.email}`}
        >
          {r.dormresident.data.getUsers.name}
        </Link>
      ) : (
        ''
      ),
      delete: (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setCurrentDeleteObject(r);
            toggleShowDeleteModal();
          }}
        >
          <Icon name="deleteForeverSharp" />
        </span>
      )
    }))
  );

  const toggleShowModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const toggleSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
  };

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteBuilding = () => {
    toggleShowModal();
    Promise.all([
      API.graphql(
        graphqlOperation(deleteDormBuildings, { input: { id, _version } })
      ),
      ...listOfRooms.map(room =>
        API.graphql(
          graphqlOperation(deleteDormRooms, {
            input: { id: room.id, _version: room._version }
          })
        )
      )
    ])
      .then(() => {
        toggleSuccessModal();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteRoom = () => {
    toggleShowDeleteModal();
    API.graphql(
      graphqlOperation(deleteDormRooms, {
        input: {
          id: currentDeleteObject.id,
          _version: currentDeleteObject._version
        }
      })
    )
      .then(() => {
        API.graphql(
          graphqlOperation(updateDormBuildings, {
            input: {
              id: id,
              capacity: accurateCapacity - 1,
              _version: _version
            }
          })
        ).then(() => {
          setAccurateCapacity(accurateCapacity - 1);
          setRoomList(prevList =>
            prevList.filter(r => r.id !== currentDeleteObject.id)
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddRoom = room =>
    new Promise((resolve, reject) => {
      API.graphql(
        graphqlOperation(createDormRooms, {
          input: { ...room, dormbuildingsID: id }
        })
      )
        .then(data => {
          const { createDormRooms } = data.data;
          API.graphql(
            graphqlOperation(updateDormBuildings, {
              input: {
                id: id,
                capacity: accurateCapacity + 1,
                _version: _version
              }
            })
          ).then(() => {
            setAccurateCapacity(prevCapacity => prevCapacity + 1);
            setRoomList(prevList => [
              ...prevList,
              {
                ...createDormRooms,
                delete: (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setCurrentDeleteObject(createDormRooms);
                      toggleShowDeleteModal();
                    }}
                  >
                    <Icon name="deleteForeverSharp" />
                  </span>
                )
              }
            ]);
            setShowAddModal(false);
            resolve();
          });
        })
        .catch(error => {
          reject(error);
        });
    });

  const redirect = () => {
    router.push('/management/dorms/buildings');
  };

  return (
    <>
      <DynamicModal
        show={showAddModal}
        onConfirm={handleAddRoom}
        onCancel={() => setShowAddModal(false)}
        title="Add Room"
        form={addRoomForm}
      />
      <ConfirmModal
        show={showDeleteModal}
        onConfirm={handleDeleteRoom}
        onCancel={() => setShowDeleteModal(false)}
        message="Are you sure you want to delete this room?"
      />
      <Modal
        show={showSuccessModal}
        onConfirm={redirect}
        onCancel={redirect}
        message="Building deleted successfully!"
      />
      <ConfirmModal
        show={showConfirmModal}
        onConfirm={handleDeleteBuilding}
        onCancel={() => setShowConfirmModal(false)}
        message="Are you sure you want to delete this building?"
      />
      <ManagementLayout userName={userName}>
        <div className={classes['title']}>
          Manage Building <div className={classes.subtitle}>{building}</div>
        </div>
        <div className={classes.tables}>
          <Card
            title="Building Information"
            icon="barChartSharp"
            extraHeader={
              <Button className={classes.extra} error onClick={toggleShowModal}>
                <Icon name="deleteForeverSharp" />
              </Button>
            }
          >
            <div className={classes.info_container}>
              <div className={classes.info_item}>
                <div className={classes.info_item_title}>Number</div>
                <div className={classes.info_item_value}>{building}</div>
              </div>
              <div className={classes.info_item}>
                <div className={classes.info_item_title}>Capacity</div>
                <div className={classes.info_item_value}>
                  {accurateCapacity}
                </div>
              </div>
            </div>
          </Card>
          <Card
            title="Room List"
            icon="checklistSharp"
            extraHeader={
              <Button
                className={classes.extra}
                onClick={() => setShowAddModal(true)}
              >
                <Icon name="addSharp" />
              </Button>
            }
          >
            <DataTable
              data={roomList}
              headers={roomsHeaders}
              pagination
              search
              filterableColumns={['dormroom', 'dormresident']}
            />
          </Card>
        </div>
      </ManagementLayout>
    </>
  );
};

export const getServerSideProps = async context => {
  const { Auth, API } = withSSRContext(context);
  const id = context.query.id;
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

  if (!id)
    return {
      redirect: { destination: '/management/buildings', permanent: false }
    };

  const buildingIdFromNumber = await API.graphql(
    graphqlOperation(listDormBuildings, {
      filter: { dormbuilding: { eq: id } }
    })
  );

  if (buildingIdFromNumber.data.listDormBuildings.items.length === 0)
    return {
      redirect: { destination: '/management/buildings', permanent: false }
    };

  const { id: buildingId } =
    buildingIdFromNumber.data.listDormBuildings.items[0];

  const buildingData = await API.graphql(
    graphqlOperation(getDormBuildings, {
      id: buildingId
    })
  );

  const { capacity, dormbuilding, DormRooms, _version } =
    buildingData.data.getDormBuildings;

  props.id = buildingId;
  props._version = _version;
  props.building = dormbuilding;
  props.capacity = capacity;
  props.listOfRooms = await Promise.all(
    DormRooms.items.map(async room => {
      const resident = room.dormresident
        ? await API.graphql(
            graphqlOperation(getUsers, {
              id: room.dormresident
            })
          )
        : '';

      return {
        id: room.id,
        dormroom: room.dormroom,
        dormresident: resident,
        _version: room._version,
        _deleted: room._deleted
      };
    })
  );

  props.listOfRooms = props.listOfRooms
    .filter(b => !b._deleted)
    .sort((a, b) => {
      if (a.dormroom < b.dormroom) return -1;
      if (a.dormroom > b.dormroom) return 1;
      return 0;
    });

  return { props: props };
};

export default BuildingPage;
