import React, { useState, useEffect } from 'react';

import classes from './ResidentForm.module.css';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUsers, createNotifications } from '../../graphql/mutations';
import {
  listDormBuildings,
  listDormRooms,
  listUsers
} from '../../graphql/queries';

import Input from '../UI/Input';
import Button from '../UI/Button';
import ErrorText from '../UI/ErrorText';
import SuccessText from '../UI/SuccessText';
import Select from '../UI/Select';

const ResidentForm = ({ data }) => {
  const [userId, setUserId] = useState(data.id);
  const [userType, setUserType] = useState(data.userType);
  const [userName, setUserName] = useState(data.name);
  const [userVersion, setUserVersion] = useState(data._version);
  const [userEmail, setUserEmail] = useState(data.email);
  const [userPhone, setUserPhone] = useState(data.phone);
  const [dormBuilding, setDormBuilding] = useState(data.dormbuilding || '');
  const [dormRoom, setDormRoom] = useState(data.dormroom || '');
  const [userVerified, setUserVerified] = useState(data.verified);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const userTypeOptions = [
    {
      id: 1,
      value: 'Dorm'
    },
    {
      id: 2,
      value: 'Dormstaff'
    }
  ];

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
    return roomExists.data.listDormRooms.items.length !== 0;
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

  const handleSubmitForm = async () => {
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
        userId
      );
      if (roomOccupied)
        return setError('A person is already living in this dorm!');

      const verifyUser = await API.graphql(
        graphqlOperation(updateUsers, {
          input: {
            id: userId,
            dormroom: dormRoom,
            dormbuilding: dormBuilding,
            userType: userType.toLowerCase(),
            _version: userVersion
          }
        })
      );

      setSuccess('User updated successfully!');
    } catch (error) {
      setError('An error has occurred.');
      console.error(error);
    }
  };

  const handleChangeUserType = option => {
    setUserType(option);
  };

  const handleVerifyUser = async () => {
    try {
      const verifyUser = await API.graphql(
        graphqlOperation(updateUsers, {
          input: {
            id: userId,
            verified: true,
            _version: userVersion
          }
        })
      );

      const message =
        userType.toLowerCase() === 'dorm'
          ? 'Your account has been verified! You can now continue in-processing on the JBA MHO site.'
          : 'Your account has been verified, you must be moved into the staff group by an administrator now.';

      const expiryDate = Math.round(new Date().getTime() / 1000);
      const sendNotification = await API.graphql(
        graphqlOperation(createNotifications, {
          input: {
            name: userName,
            email: userEmail,
            subject: 'Account Verified',
            message: message,
            expiryTime: expiryDate
          }
        })
      );

      setSuccess('User verified successfully!');
    } catch (error) {
      setError('An error occurred.');
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.name}>
        <img
          className={classes.image}
          src="/images/management/residents.svg"
          alt="table icon"
        />
        Resident:&nbsp;
        <span className={classes['resident-name']}>{userName}</span>
      </div>
      <form onSubmit={handleSubmitForm}>
        <div className={classes.flex}>
          <div className={classes['form-control']}>
            <label className={classes.label}>Email: </label>
            <Input
              className={classes.input}
              type="text"
              value={userEmail}
              disabled
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Phone: </label>
            <Input
              className={classes.input}
              type="text"
              value={userPhone}
              disabled
            />
          </div>
          {userType.toLowerCase() != 'dormstaff' && (
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
            </>
          )}
          <div className={classes['form-control']}>
            <label className={classes.label}>User Type: </label>
            <Select
              className={classes.input}
              options={userTypeOptions}
              value={userType}
              onSelect={handleChangeUserType}
            />
          </div>
        </div>
        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>{success}</SuccessText>}
        <Button className={classes.button} onClick={handleSubmitForm}>
          Update
        </Button>
        {!userVerified && (
          <Button
            type="button"
            className={classes.verify}
            onClick={handleVerifyUser}
          >
            Verify
          </Button>
        )}
      </form>
    </div>
  );
};

export default ResidentForm;
