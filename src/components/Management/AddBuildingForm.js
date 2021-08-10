import React, { useState } from 'react';

import classes from './AddBuildingForm.module.css';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import ErrorText from '../../components/UI/ErrorText';

const AddBuildingForm = ({ onSubmit }) => {
  const [enteredBuildingNumber, setEnteredBuildingNumber] = useState('');
  const [enteredRooms, setEnteredRooms] = useState('');
  const [error, setError] = useState(null);

  const handleSubmitForm = event => {
    event.preventDefault();
    if (!enteredBuildingNumber || !enteredRooms)
      return setError('You forgot to fill in a value!');

    const sanitizedRooms = enteredRooms.replace(/\s/g, '').match(/([^,]+)/g);
    const buildingCapacity = sanitizedRooms.length;
    onSubmit(enteredBuildingNumber, buildingCapacity, sanitizedRooms);
    setEnteredRooms('');
    setEnteredBuildingNumber('');
  };

  const handleChangeBuilding = event => {
    setEnteredBuildingNumber(event.target.value);
    setError(null);
  };

  const handleChangeRooms = event => {
    setEnteredRooms(event.target.value);
    setError(null);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>Add a Building</div>
      <form className={classes.form} onSubmit={handleSubmitForm}>
        <div className={classes.flex}>
          <div className={classes['form-control']}>
            <label className={classes.label}>Building Number: </label>
            <Input
              onChange={handleChangeBuilding}
              value={enteredBuildingNumber}
              className={classes.input}
              type="text"
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Room Numbers: </label>
            <Input
              onChange={handleChangeRooms}
              value={enteredRooms}
              className={classes.input}
              type="text"
            />
          </div>
        </div>
        {error && <ErrorText>{error}</ErrorText>}
        <Button className={classes.button} onClick={handleSubmitForm}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddBuildingForm;
