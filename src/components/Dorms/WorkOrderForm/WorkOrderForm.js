import { useState } from 'react';
import classes from './WorkOrderForm.module.css';
import {
  Input,
  Select,
  TextArea,
  CheckBox,
  Button,
  Spinner,
  AlertBox
} from '../../UI/';

const WorkOrderForm = ({
  fetchedName,
  fetchedPhone,
  fetchedBuilding,
  fetchedRoom,
  onSubmit,
  loading
}) => {
  const [formData, setFormData] = useState({
    name: fetchedName || '',
    phone: fetchedPhone || '',
    building: fetchedBuilding || '',
    roomNumber: fetchedRoom || '',
    rank: '',
    urgency: '',
    requestType: '',
    description: '',
    permission: false,
    securingYourItems: false,
    escort: false
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const rankOptions = [
    {
      value: 'E1',
      label: 'E1'
    },
    {
      label: 'E2',
      value: 'E2'
    },
    {
      label: 'E3',
      value: 'E3'
    },
    {
      label: 'E4',
      value: 'E4'
    },
    {
      label: 'E5',
      value: 'E5'
    },
    {
      label: 'E6',
      value: 'E6'
    },
    {
      label: 'E7',
      value: 'E7'
    },
    {
      label: 'E8',
      value: 'E8'
    },
    {
      label: 'E9',
      value: 'E9'
    }
  ];

  const urgencyOptions = [
    {
      label: 'Routine',
      value: 'Routine'
    },
    {
      label: 'Emergency',
      value: 'Urgent'
    }
  ];

  const requestTypeOptions = [
    {
      label: 'Door Lock',
      value: 'Door Lock'
    },
    {
      label: 'Locker/Shelves',
      value: 'Locker/Shelves'
    },
    {
      label: 'Furniture',
      value: 'Furniture'
    },
    {
      label: 'Windows/Screens',
      value: 'Windows/Screens'
    },
    {
      label: 'Drywall',
      value: 'Drywall'
    },
    {
      label: 'Bed',
      value: 'Bed'
    },
    {
      label: 'Electrical',
      value: 'Electrical'
    },
    {
      label: 'Air Condition/Heat',
      value: 'Air Condition/Heat'
    },
    {
      label: 'Hot/Cold Water Temperature',
      value: 'Hot/Cold Water Temperature'
    },
    {
      label: 'Toilet',
      value: 'Toilet'
    },
    {
      label: 'Sink/Faucet',
      value: 'Sink/Faucet'
    },
    {
      label: 'Shower',
      value: 'Shower'
    },
    {
      label: 'Washer/Dryer/Stove/Appliance',
      value: 'Washer/Dryer/Stove/Appliance'
    },
    {
      label: 'Other',
      value: 'Other'
    }
  ];

  const handleValueChange = event => {
    const { name, value } = event.target;

    console.log(event);

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    console.log(formData);

    setError(null);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSuccess('');
    setError('');

    const errors = [];
    if (!formData.phone) errors.push('You must enter your phone number');
    if (!formData.name) errors.push('You must enter your name.');
    if (!formData.rank) errors.push('You must select a rank.');
    if (!formData.building) errors.push('You must enter your dorm building.');
    if (!formData.roomNumber) errors.push('You must enter your room number.');
    if (!formData.urgency) errors.push('You must select an urgency type.');
    if (!formData.description)
      errors.push('You must enter a problem description.');
    if (!formData.requestType) errors.push('You must select a request type.');
    if (!formData.permission)
      errors.push('You must give permission for access to your room.');
    if (!formData.escort)
      errors.push(
        'You must indicate that you understand an escort may or may not be provided and that there may be a single individual entering your room.'
      );
    if (!formData.securingYourItems)
      errors.push(
        'You must indicate that you understand you are responsible for securing your belongings.'
      );

    if (!errors.length) {
      const expiryTime = Math.round(new Date().getTime() / 1000);
      const newWorkOrder = {
        ...formData,
        expiryTime
      };

      onSubmit(newWorkOrder)
        .then(() => {
          setError(null);
          setSuccess('Successfully submitted work order!');
          setFormData(prevData => ({
            ...prevData,
            urgency: '',
            requestType: '',
            description: '',
            permission: false,
            securingYourItems: false,
            escort: false
          }));

          setTimeout(() => setSuccess(null), 5000);
        })
        .catch(() => {
          setError('There was an error submitting your work order.');
        });
    } else {
      setError(errors.join('\n'));
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <div className={classes.grid}>
          <div className={`${classes['form-control']} ${classes.spanTwo}`}>
            <label className={classes.label}>Name:</label>
            <Input
              value={formData.name}
              name="name"
              onChange={handleValueChange}
              type="text"
              required
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Phone:</label>
            <Input
              value={formData.phone}
              name="phone"
              onChange={handleValueChange}
              type="text"
              required
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Building:</label>
            <Input
              value={formData.building}
              name="building"
              onChange={handleValueChange}
              type="text"
              required
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Room Number:</label>
            <Input
              value={formData.roomNumber}
              name="roomNumber"
              onChange={handleValueChange}
              type="text"
              required
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Rank:</label>
            <Select
              onSelect={handleValueChange}
              name="rank"
              id="rank"
              options={rankOptions}
              value={formData.rank}
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Urgency:</label>
            <Select
              onSelect={handleValueChange}
              id="urgency"
              name="urgency"
              options={urgencyOptions}
              value={formData.urgency}
            />
          </div>
          <div className={classes['form-control']}>
            <label className={classes.label}>Request Type:</label>
            <Select
              onSelect={handleValueChange}
              name="requestType"
              id="requestType"
              options={requestTypeOptions}
              value={formData.requestType}
            />
          </div>
          <div className={`${classes['form-control']} ${classes.spanThree}`}>
            <label className={classes.label}>Problem Description:</label>
            <TextArea
              onChange={handleValueChange}
              className={classes.input}
              type="text"
              name="description"
              value={formData.description}
              required
            />
          </div>
          <div className={classes['form-control-check']}>
            <CheckBox
              onCheck={handleValueChange}
              name="permission"
              className={classes.checkbox}
              value={formData.permission}
            />
            <label className={classes.label}>
              I give permission for access to my room in all matters related to
              maintenance, health and welfare, safety and fire inspections,
              cable and internet services.
            </label>
          </div>
          <div className={classes['form-control-check']}>
            <CheckBox
              onCheck={handleValueChange}
              name="escort"
              className={classes.checkbox}
              value={formData.escort}
            />
            <label className={classes.label}>
              I understand that an escort may or may not be provided by the UH
              Staff and there may be a single individual entering my room.
            </label>
          </div>
          <div className={classes['form-control-check']}>
            <CheckBox
              onCheck={handleValueChange}
              name="securingYourItems"
              className={classes.checkbox}
              value={formData.securingYourItems}
            />
            <label className={classes.label}>
              I understand that by granting access, I am responsible for
              securing any personal belongings and valuables.
            </label>
          </div>

          {error && (
            <AlertBox
              type="error"
              title="Error!"
              message={error}
              className={classes.spanThree}
              closable
            />
          )}
          {success && (
            <AlertBox
              type="success"
              title="Success!"
              message={success}
              className={classes.spanThree}
              closable
            />
          )}
          <Button className={classes.button} disabled={loading}>
            {loading ? <Spinner /> : 'Submit Work Order'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkOrderForm;
