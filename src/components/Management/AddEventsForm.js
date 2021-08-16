import React, { useState } from 'react';

import classes from './AddEventsForm.module.css';

import Input from '../UI/Input';
import Button from '../UI/Button';
import ErrorText from '../UI/ErrorText';

const AddEventsForm = ({ onSubmit }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);

  const handleChangeEventTitle = event => {
    setEventTitle(event.target.value);
    setError(null);
  };

  const handleChangeDate = event => {
    setDate(event.target.value);
    setError(null);
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    setError(null);
    const enteredDate = new Date(date);
    enteredDate.setDate(enteredDate.getDate() + 1);
    const expiryDate = Math.round(enteredDate.getTime() / 1000);
    if (!date || !eventTitle) return setError('You must fill in both fields!');
    const newEvent = {
      date: date,
      title: eventTitle,
      expiryTime: expiryDate
    };
    onSubmit(newEvent);
    setDate('');
    setEventTitle('');
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>Add an Event</div>
      <form className={classes.form} onSubmit={handleSubmitForm}>
        <div className={classes.flex}>
          <div className={classes['form-control']}>
            <label className={classes.label}>Event Title: </label>
            <Input
              onChange={handleChangeEventTitle}
              value={eventTitle}
              className={classes.input}
              type="text"
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Date: </label>
            <Input
              onChange={handleChangeDate}
              value={date}
              className={classes.input}
              placeholder="2021-08-17"
              type="date"
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

export default AddEventsForm;
