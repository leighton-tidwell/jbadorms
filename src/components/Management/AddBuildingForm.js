import React, { useState } from 'react';
import classes from './AddBuildingForm.module.css';
import { Input, Button, AlertBox, Spinner } from '../../components/UI/';
import { listDormBuildings } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

const AddBuildingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    dormbuilding: '',
    capacity: '',
    roomNumbers: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = event => {
    event.preventDefault();
    if (!formData.dormbuilding || !formData.roomNumbers)
      return setError('You forgot to fill in a value!');
    setLoading(true);

    const sanitizedRooms = formData.roomNumbers
      .replace(/\s/g, '')
      .match(/([^,]+)/g);
    const buildingCapacity = sanitizedRooms.length;

    if (!sanitizedRooms.length)
      return setError(
        'Room numbers must be entered in a comma seperated format (ex. 1,2,3,4,5)'
      );

    API.graphql(
      graphqlOperation(listDormBuildings, {
        filter: { dormbuilding: { eq: formData.dormbuilding } }
      })
    ).then(data => {
      if (data.data.listDormBuildings.items.length !== 0) {
        if (
          data.data.listDormBuildings.items.find(
            item => item._deleted === false
          )
        ) {
          setLoading(false);
          return setError('That building already exists!');
        }
      }
      onSubmit(formData.dormbuilding, buildingCapacity, sanitizedRooms)
        .then(() => {
          setLoading(false);
          setFormData({
            dormbuilding: '',
            capacity: '',
            roomNumbers: ''
          });
          setSuccess('Building added successfully!');
          setTimeout(() => setSuccess(''), 3000);
        })
        .catch(error => {
          setLoading(false);
          setError('Something went wrong, please try again!');
          console.log(error);
        });
    });
  };

  const handleDataChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    setError('');
    setSuccess('');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmitForm}>
      <div className={classes.flex}>
        <div className={classes['form-control']}>
          <label className={classes.label}>Building Number: </label>
          <Input
            onChange={handleDataChange}
            value={formData.dormbuilding}
            className={classes.input}
            type="text"
            name="dormbuilding"
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Room Numbers: </label>
          <Input
            onChange={handleDataChange}
            value={formData.roomNumbers}
            className={classes.input}
            type="text"
            name="roomNumbers"
          />
        </div>
        <div
          className={classes['form-control']}
          style={{ justifyContent: 'flex-end' }}
        >
          <Button
            className={classes.button}
            disabled={loading}
            onClick={handleSubmitForm}
          >
            {loading ? <Spinner /> : 'Add'}
          </Button>
        </div>
      </div>
      {error && (
        <AlertBox title="Error!" type="error" message={error} closable />
      )}
      {success && (
        <AlertBox title="Success!" type="success" message={success} closable />
      )}
    </form>
  );
};

export default AddBuildingForm;
