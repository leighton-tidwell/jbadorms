import React, { useState } from 'react';

import classes from './AddFAQForm.module.css';

import Input from '../UI/Input';
import Button from '../UI/Button';
import ErrorText from '../UI/ErrorText';

const AddFAQForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);

  const handleChangeQuestion = event => {
    setQuestion(event.target.value);
    setError(null);
  };

  const handleChangeAnswer = event => {
    setAnswer(event.target.value);
    setError(null);
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    setError(null);
    if (!answer || !question) return setError('You must fill in both fields!');
    const newFAQ = {
      question,
      answer
    };
    onSubmit(newFAQ);
    setQuestion('');
    setAnswer('');
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>Add an FAQ</div>
      <form className={classes.form} onSubmit={handleSubmitForm}>
        <div className={classes.flex}>
          <div className={classes['form-control']}>
            <label className={classes.label}>Question: </label>
            <Input
              onChange={handleChangeQuestion}
              value={question}
              className={classes.input}
              type="text"
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Answer: </label>
            <Input
              onChange={handleChangeAnswer}
              value={answer}
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

export default AddFAQForm;
