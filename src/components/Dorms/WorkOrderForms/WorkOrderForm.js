import React, { useState } from 'react';
import uuid from 'react-uuid';

import classes from './WorkOrderForm.module.css';

import Input from '../../UI/Input';
import Select from '../../UI/Select';
import TextArea from '../../UI/TextArea';
import CheckBox from '../../UI/CheckBox';
import Button from '../../UI/Button';
import ErrorText from '../../UI/ErrorText';
import SuccessText from '../../UI/SuccessText';

const WorkOrderForm = ({
  fetchedName,
  fetchedPhone,
  fetchedBuilding,
  fetchedRoom,
  onSubmit
}) => {
  const [name, setName] = useState(fetchedName);
  const [phone, setPhone] = useState(fetchedPhone);
  const [building, setBuilding] = useState(fetchedBuilding || '');
  const [roomNumber, setRoomNumber] = useState(fetchedRoom || '');
  const [rank, setRank] = useState('E1');
  const [urgency, setUrgency] = useState('Routine');
  const [requestType, setRequestType] = useState('Door Lock');
  const [problemDescription, setProblemDescription] = useState('');
  const [permissionToEnter, setPermissionToEnter] = useState(false);
  const [escort, setEscort] = useState(false);
  const [personalBelongings, setPersonalBelongings] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSucces] = useState(null);

  const rankOptions = [
    {
      id: uuid(),
      value: 'E1'
    },
    {
      id: uuid(),
      value: 'E2'
    },
    {
      id: uuid(),
      value: 'E3'
    },
    {
      id: uuid(),
      value: 'E4'
    },
    {
      id: uuid(),
      value: 'E5'
    },
    {
      id: uuid(),
      value: 'E6'
    },
    {
      id: uuid(),
      value: 'E7'
    },
    {
      id: uuid(),
      value: 'E8'
    },
    {
      id: uuid(),
      value: 'E9'
    }
  ];

  const urgencyOptions = [
    {
      id: uuid(),
      value: 'Routine'
    },
    {
      id: uuid(),
      value: 'Urgent'
    }
  ];

  const requestTypeOptions = [
    {
      id: uuid(),
      value: 'Door Lock'
    },
    {
      id: uuid(),
      value: 'Locker/Shelves'
    },
    {
      id: uuid(),
      value: 'Furniture'
    },
    {
      id: uuid(),
      value: 'Windows/Screens'
    },
    {
      id: uuid(),
      value: 'Drywall'
    },
    {
      id: uuid(),
      value: 'Bed'
    },
    {
      id: uuid(),
      value: 'Electrical'
    },
    {
      id: uuid(),
      value: 'Air Condition/Heat'
    },
    {
      id: uuid(),
      value: 'Hot/Cold Water Temperature'
    },
    {
      id: uuid(),
      value: 'Toilet'
    },
    {
      id: uuid(),
      value: 'Sink/Faucet'
    },
    {
      id: uuid(),
      value: 'Shower'
    },
    {
      id: uuid(),
      value: 'Washer/Dryer/Stove/Appliance'
    },
    {
      id: uuid(),
      value: 'Other'
    }
  ];

  const handleChangeName = event => {
    setName(event.target.value);
    setError(null);
  };

  const handleChangePhone = event => {
    setPhone(event.target.value);
    setError(null);
  };

  const handleChangeBuilding = event => {
    setBuilding(event.target.value);
    setError(null);
  };

  const handleChangeRoomNumber = event => {
    setRoomNumber(event.target.value);
    setError(null);
  };

  const handleSelectRank = selectedRank => {
    setRank(selectedRank);
    setError(null);
  };

  const handleSelectUrgency = selectedUrgency => {
    setUrgency(selectedUrgency);
    setError(null);
  };

  const handleSelectRequestType = selectedRequestType => {
    setRequestType(selectedRequestType);
    setError(null);
  };

  const handleChangeProblemDescription = event => {
    setProblemDescription(event.target.value);
    setError(null);
  };

  const handleCheckPermission = check => {
    setPermissionToEnter(check);
  };

  const handleCheckEscort = check => {
    setEscort(check);
  };

  const handlePersonalBelongings = check => {
    setPersonalBelongings(check);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!phone) return setError('You must enter your phone number');
    if (!name) return setError('You must enter your name.');
    if (!rank) return setError('You must select a rank.');
    if (!building) return setError('You must enter your dorm building.');
    if (!roomNumber) return setError('You must enter your room number.');
    if (!urgency) return setError('You must select an urgency type.');
    if (!problemDescription)
      return setError('You must enter a problem description.');
    if (!requestType) return setError('You must select a request type.');
    const expiryTime = Math.round(new Date().getTime() / 1000);
    const newWorkOrder = {
      phone,
      name,
      rank,
      building,
      roomNumber,
      urgency,
      requestType,
      description: problemDescription,
      permission: permissionToEnter,
      escort,
      securingYourItems: personalBelongings,
      expiryTime
    };
    onSubmit(newWorkOrder);
    setError(null);
    setSucces('Successfully submitted work order!');
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <div className={classes['form-control']}>
          <label className={classes.label}>Name:</label>
          <Input
            value={name}
            onChange={handleChangeName}
            className={classes.input}
            type="text"
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Phone:</label>
          <Input
            value={phone}
            onChange={handleChangePhone}
            className={classes.input}
            type="text"
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Building:</label>
          <Input
            value={building}
            onChange={handleChangeBuilding}
            className={classes.input}
            type="text"
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Room Number:</label>
          <Input
            value={roomNumber}
            onChange={handleChangeRoomNumber}
            className={classes.input}
            type="text"
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Rank:</label>
          <Select
            onSelect={handleSelectRank}
            options={rankOptions}
            className={classes.select}
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Urgency:</label>
          <Select
            onSelect={handleSelectUrgency}
            options={urgencyOptions}
            className={classes.select}
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Request Type:</label>
          <Select
            onSelect={handleSelectRequestType}
            options={requestTypeOptions}
            className={classes.select}
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Problem Description:</label>
          <TextArea
            onChange={handleChangeProblemDescription}
            className={classes.input}
            type="text"
          >
            {problemDescription}
          </TextArea>
        </div>
        <div className={classes['form-control-check']}>
          <CheckBox
            onCheck={handleCheckPermission}
            className={classes.checkbox}
          />
          <label className={classes.label}>
            I give permission for access to my room in all matters related to
            maintenance, health and welfare, safety and fire inspections, cable
            and internet services:
          </label>
        </div>
        <div className={classes['form-control-check']}>
          <CheckBox onCheck={handleCheckEscort} className={classes.checkbox} />
          <label className={classes.label}>
            I understand that an escort may or may not be provided by the UH
            Staff and there may be a single individual entering my room:
          </label>
        </div>
        <div className={classes['form-control-check']}>
          <CheckBox
            onCheck={handlePersonalBelongings}
            className={classes.checkbox}
          />
          <label className={classes.label}>
            I understand that by granting access, I am responsible for securing
            any personal belongings and valuables:
          </label>
        </div>
        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>{success}</SuccessText>}
        <Button className={classes.button}>Submit Work Order</Button>
      </form>
    </div>
  );
};

export default WorkOrderForm;
