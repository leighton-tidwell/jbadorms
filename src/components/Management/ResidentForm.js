import React, { useState, useEffect } from 'react';

import classes from './ResidentForm.module.css';
import { API, graphqlOperation } from 'aws-amplify';
import {
  updateUsers,
  createNotifications,
  updateDormRooms
} from '../../graphql/mutations';
import {
  listDormBuildings,
  listDormRooms,
  listUsers
} from '../../graphql/queries';

import { Input, Button, ErrorText, SuccessText, Spinner } from '../UI/';

const ResidentForm = ({ data }) => {
  const [dormBuilding, setDormBuilding] = useState(data.dormbuilding || '');
  const [dormRoom, setDormRoom] = useState(data.dormroom || '');
  const [userVerified, setUserVerified] = useState(data.verified);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleChangeDormRoom = event => {
    setSuccess(null);
    setError(null);
    setDormRoom(event.target.value);
  };

  const handleChangeDormBuilding = event => {
    setSuccess(null);
    setError(null);
    setDormBuilding(event.target.value);
  };

  const checkDormBuildingValidity = async building => {
    const buildingExists = await API.graphql(
      graphqlOperation(listDormBuildings, {
        filter: { dormbuilding: { eq: building } }
      })
    );
    if (buildingExists.data.listDormBuildings.items.length !== 0)
      return buildingExists.data.listDormBuildings.items[0].id;
  };

  const checkDormRoomValidity = async (buildingId, room) => {
    const roomExists = await API.graphql(
      graphqlOperation(listDormRooms, {
        filter: {
          and: [
            { dormbuildingsID: { eq: buildingId } },
            { dormroom: { eq: room } }
          ]
        }
      })
    );
    if (roomExists.data.listDormRooms.items.length === 0) return false;
    return roomExists.data.listDormRooms.items[0];
  };

  const checkForPersonInDorm = async (building, room, userId) => {
    const userInThisRoom = await API.graphql(
      graphqlOperation(listUsers, {
        filter: {
          and: [
            { dormbuilding: { eq: building } },
            { dormroom: { eq: room } },
            { id: { ne: userId } }
          ]
        }
      })
    );
    return userInThisRoom.data.listUsers.items.length !== 0;
  };

  const checkForPreviousDorm = async () => {
    const foundUser = await API.graphql(
      graphqlOperation(listDormRooms, {
        filter: { dormresident: { eq: data.id } }
      })
    );
    if (foundUser.data.listDormRooms.items.length === 0) return false;
    return foundUser.data.listDormRooms.items[0];
  };

  const handleSubmitForm = async event => {
    event.preventDefault();
    if (!dormBuilding || !dormRoom)
      return setError('You must enter a dorm building and room.');

    try {
      const buildingExists = await checkDormBuildingValidity(dormBuilding);
      if (!buildingExists)
        return setError('The specified dorm building does not exist!');

      const roomExists = await checkDormRoomValidity(buildingExists, dormRoom);
      if (!roomExists)
        return setError('The specified dorm room does not exist.');

      const roomOccupied = await checkForPersonInDorm(
        dormBuilding,
        dormRoom,
        data.id
      );
      if (roomOccupied)
        return setError('A person is already living in this dorm!');

      setLoading(true);
      await API.graphql(
        graphqlOperation(updateUsers, {
          input: {
            id: data.id,
            dormroom: dormRoom,
            dormbuilding: dormBuilding,
            _version: data._version
          }
        })
      );

      if (data.dormroom && data.dormbuilding) {
        const previousDorm = await checkForPreviousDorm();
        if (previousDorm) {
          await API.graphql(
            graphqlOperation(updateDormRooms, {
              input: {
                id: previousDorm.id,
                dormresident: null,
                _version: previousDorm._version
              }
            })
          );
        }
      }

      await API.graphql(
        graphqlOperation(updateDormRooms, {
          input: {
            id: roomExists.id,
            dormresident: data.id,
            _version: roomExists._version
          }
        })
      );
      setLoading(false);
      setSuccess('User updated successfully!');
    } catch (error) {
      setLoading(false);
      setError('An error has occurred.');
      console.error(error);
    }
  };

  const handleVerifyUser = async () => {
    setVerifyLoading(true);
    await API.graphql(
      graphqlOperation(updateUsers, {
        input: {
          id: data.id,
          verified: true,
          _version: data._version
        }
      })
    )
      .then(() => {
        const message =
          data.userType?.toLowerCase() === 'dorm'
            ? 'Your account has been verified! You can now continue in-processing on the JBA MHO site.'
            : 'Your account has been verified, you must be moved into the staff group by an administrator now.';

        const expiryDate = Math.round(new Date().getTime() / 1000);
        API.graphql(
          graphqlOperation(createNotifications, {
            input: {
              name: data.name,
              email: data.email,
              subject: 'Account Verified',
              message: message,
              expiryTime: expiryDate
            }
          })
        )
          .then(() => {
            setUserVerified(true);
            setVerifyLoading(false);
            setSuccess('User verified successfully!');
          })
          .catch(error => {
            console.log(error);
            setError('An error occured, please try again.');
          });
      })
      .catch(error => {
        console.log(error);
        setVerifyLoading(false);
        setError('An error occured, please try again.');
      });
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <div className={classes.flex}>
          <div className={classes['form-control']}>
            <label className={classes.label}>Email: </label>
            <Input
              className={classes.input}
              type="text"
              value={data.email}
              disabled
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Phone: </label>
            <Input
              className={classes.input}
              type="text"
              value={data.phone}
              disabled
            />
          </div>
          {data.userType?.toLowerCase() != 'dormstaff' && (
            <>
              <div className={classes['form-control']}>
                <label className={classes.label}>Dorm Building: </label>
                <Input
                  className={classes.input}
                  value={dormBuilding}
                  onChange={handleChangeDormBuilding}
                  type="text"
                />
              </div>
              <div className={classes['form-control']}>
                <label className={classes.label}>Dorm Room: </label>
                <Input
                  className={classes.input}
                  value={dormRoom}
                  onChange={handleChangeDormRoom}
                  type="text"
                />
              </div>
              <div className={classes['form-control']}>
                <label className={classes.label}>
                  User Signed Resident Responsibilities:{' '}
                </label>
                <Input
                  className={classes.input}
                  value={data.residentresponsibilities || false}
                  type="text"
                  disabled
                />
              </div>
              <div className={classes['form-control']}>
                <label className={classes.label}>
                  User Signed Mattress Protector Agreement:{' '}
                </label>
                <Input
                  className={classes.input}
                  value={data.mattressagreement || false}
                  type="text"
                  disabled
                />
              </div>
            </>
          )}
          <div className={classes['form-control']}>
            <label className={classes.label}>User Type: </label>
            <Input
              className={classes.input}
              value={
                data.userType === 'dormstaff' ? 'Dorm Staff' : 'Dorm Resident'
              }
              disabled
            />
          </div>
        </div>
        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>{success}</SuccessText>}
        <div className={classes.control}>
          {!data.userType === 'dormstaff' && (
            <Button
              disabled={loading}
              className={classes.button}
              onClick={handleSubmitForm}
            >
              {loading ? <Spinner /> : 'Update'}
            </Button>
          )}
          {!userVerified && (
            <Button
              type="button"
              disabled={verifyLoading}
              className={`${classes.verify} ${classes.button}`}
              onClick={handleVerifyUser}
            >
              {verifyLoading ? <Spinner /> : 'Verify'}
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default ResidentForm;
