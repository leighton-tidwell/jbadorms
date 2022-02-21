import React, { useState } from 'react';

import classes from './AddFAQForm.module.css';

import { Input, Button, ErrorText, Spinner } from '../UI/';

const AddFAQForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    if (!formData.answer || !formData.question)
      return setError('You must fill in both fields!');
    setLoading(true);
    onSubmit({ question: formData.question, answer: formData.answer })
      .then(() => {
        setLoading(false);
        setFormData({
          question: '',
          answer: ''
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
          <label className={classes.label}>Question: </label>
          <Input
            onChange={handleChangeData}
            value={formData.question}
            name="question"
            className={classes.input}
            type="text"
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Answer: </label>
          <Input
            onChange={handleChangeData}
            value={formData.answer}
            name="answer"
            className={classes.input}
            type="text"
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

export default AddFAQForm;
