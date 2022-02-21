import React, { useState } from 'react';

import classes from './AddEventsForm.module.css';

import { Input, Button, ErrorText, Spinner } from '../UI/';

const AddEventsForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    title: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangeData = event => {
    setError(null);
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    setError(null);
    if (!formData.date || !formData.title)
      return setError('You must fill in both fields!');

    const enteredDate = new Date(formData.date);
    enteredDate.setDate(enteredDate.getDate() + 1);
    const expiryDate = Math.round(enteredDate.getTime() / 1000);

    setLoading(true);
    onSubmit({
      date: formData.date,
      title: formData.title,
      expiryTime: expiryDate
    })
      .then(() => {
        setLoading(false);
        setFormData({
          date: '',
          title: ''
        });
      })
      .catch(error => {
        setLoading(false);
        setError('Something went wrong, please try again!');
      });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmitForm}>
      <div className={classes.flex}>
        <div className={classes['form-control']}>
          <label className={classes.label}>Event Title: </label>
          <Input
            onChange={handleChangeData}
            name="title"
            value={formData.title}
            className={classes.input}
            type="text"
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Date: </label>
          <Input
            onChange={handleChangeData}
            value={formData.date}
            name="date"
            className={classes.input}
            placeholder="2021-08-17"
            type="date"
          />
        </div>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
      <Button
        disabled={loading}
        className={classes.button}
        onClick={handleSubmitForm}
      >
        {loading ? <Spinner /> : 'Add'}
      </Button>
    </form>
  );
};

export default AddEventsForm;
