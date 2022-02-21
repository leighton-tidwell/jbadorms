import React, { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import {
  createAppointments,
  createNotifications
} from '../../../graphql/mutations';
import { listAppointments, listUsers } from '../../../graphql/queries';
import classes from './AppointmentForm.module.css';
import {
  Select,
  Calendar,
  Button,
  Input,
  Form,
  Label,
  Spinner,
  AlertBox
} from '../../UI/';
import dayjs from 'dayjs';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

const serviceOptions = [
  { value: 'Check In', label: 'Check In' },
  { value: 'Check Out', label: 'Check Out' },
  { value: 'Inspection', label: 'Inspection' }
];

const availableTimesDefault = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00'
];

const AppointmentForm = ({ name, phone, email }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    date: null,
    time: null,
    service: null,
    employee: null,
    name,
    phone,
    email
  });
  const [employeeOpts, setEmployeeOpts] = useState([]);
  const [availableTimes, setAvailableTimes] = useState(availableTimesDefault);
  const [loading, setLoading] = useState(false);

  const handleDateSelect = async dateObject => {
    setFormData(prevData => ({ ...prevData, date: dateObject }));
  };

  const findAvailableAppointmentsForEmployee = async () => {
    const employeeEmail = employeeOpts.find(
      employee => employee.value === formData.employee
    ).email;

    const appointmentDateObject = dayjs(
      `${formData.date?.month} ${formData.date?.day}, ${formData.date?.year}`
    );

    const formattedDate = appointmentDateObject.format('YYYY-MM-DD');

    const existingAppointments = await API.graphql(
      graphqlOperation(listAppointments, {
        filter: {
          and: [
            {
              dateOfAppointment: { eq: formattedDate }
            },
            { employeeEmail: { eq: employeeEmail } }
          ]
        }
      })
    );
    const existingAppointmentsArray =
      existingAppointments.data.listAppointments.items;

    const takenAppointmentTimes = existingAppointmentsArray.map(
      appointment => appointment.timeOfAppointment
    );
    setAvailableTimes(
      availableTimesDefault.filter(
        appointmentTime => !takenAppointmentTimes.includes(appointmentTime)
      )
    );
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setSuccess('');
    setError('');
  };

  const handleSubmitForm = async event => {
    event.preventDefault();
    setError(null);
    if (!formData.employee) return setError('You must pick an employee!');
    if (!formData.service) return setError('You must pick a service!');
    if (!formData.email) return setError('You must provide your email.');
    if (!formData.phone) return setError('You must provide your phone number.');
    if (!formData.name) return setError('You must provide your name!');
    setLoading(true);

    const appointmentDateObject = dayjs(
      `${formData.date?.month} ${formData.date?.day}, ${formData.date?.year}`
    );

    const formattedDate = appointmentDateObject.format('YYYY-MM-DD');
    const messageFormat = appointmentDateObject.format('MM/DD/YYYY');

    const employeeEmail = employeeOpts.find(
      employee => employee.value === formData.employee
    ).email;

    const expiryDate = Math.round(new Date().getTime() / 1000);

    const newAppointment = {
      service: formData.service,
      employeeName: formData.employee,
      employeeEmail: employeeEmail,
      dateOfAppointment: formattedDate,
      timeOfAppointment: formData.time,
      nameOfResident: formData.name,
      emailOfResident: formData.email,
      phoneOfResident: formData.phone,
      expiryTime: expiryDate
    };
    try {
      await API.graphql(
        graphqlOperation(createAppointments, { input: newAppointment })
      );
      const message = `An appointment with you for ${formData.service} has been scheduled for ${messageFormat} at ${formData.time} with ${formData.name}.`;

      const expiryDate = Math.round(new Date().getTime() / 1000);
      await API.graphql(
        graphqlOperation(createNotifications, {
          input: {
            name: formData.name,
            email: employeeEmail,
            subject: 'An Appointment Has Been Scheduled!',
            message: message,
            expiryTime: expiryDate
          }
        })
      );

      const confirmation = `An appointment with ${formData.employee} for ${formData.service} has been scheduled for ${messageFormat} at ${formData.time}.`;
      await API.graphql(
        graphqlOperation(createNotifications, {
          input: {
            name: formData.name,
            email: formData.email,
            subject: 'Appointment Confirmation',
            message: confirmation,
            expiryTime: expiryDate
          }
        })
      );

      setSuccess('Your appointment was scheduled successfully!');
      setLoading(false);
      setFormData(prevData => ({
        ...prevData,
        time: null,
        service: null,
        employee: null
      }));
    } catch (error) {
      setError('An error has occured.');
      setLoading(false);
      console.log(error);
    }
  };

  const getStaffList = async () => {
    const staffList = await API.graphql(
      graphqlOperation(listUsers, {
        filter: {
          and: [{ userType: { eq: 'dormstaff' } }, { verified: { eq: true } }]
        }
      })
    );

    const filteredStaffList = staffList.data.listUsers.items.map(staff => ({
      id: staff.id,
      label: staff.name,
      value: staff.name,
      email: staff.email
    }));

    setEmployeeOpts(filteredStaffList);
  };

  useEffect(() => {
    getStaffList();
  }, []);

  useEffect(() => {
    if (formData.employee) findAvailableAppointmentsForEmployee();
  }, [formData.employee, formData.date]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.flex}>
      <Form onSubmit={handleSubmitForm} className={classes.form}>
        <div className={classes['first-step']}>
          <div className={classes['form-control']}>
            <Label className={classes.label}>Select Service:</Label>
            <Select
              className={classes.select}
              options={serviceOptions}
              onSelect={value =>
                handleChange({ target: { name: 'service', value } })
              }
              value={formData.service}
            />
          </div>
          <div className={classes['form-control']}>
            <Label className={classes.label}>Select Employee:</Label>
            <Select
              className={classes.select}
              options={employeeOpts}
              onSelect={value =>
                handleChange({ target: { name: 'employee', value } })
              }
              value={formData.employee}
            />
          </div>
          <div className={classes['form-control']}>
            <Label className={classes.label}>Select Date:</Label>
            <Calendar onDateChange={handleDateSelect} />
          </div>
        </div>
        <div className={classes['second-step']}>
          <div className={classes['form-control']}>
            <div className={classes['appointments-available']}>
              {formData.date
                ? `Available times on ${formData.date?.month} ${formData.date?.day}, ${formData.date?.year}:`
                : 'Please select a date to see available times.'}
            </div>
            <div
              className={classes['time-selector']}
              style={{ display: formData.date ? 'flex' : 'none' }}
            >
              {!availableTimes && (
                <div className={classes['no-time-available']}>
                  No available times
                </div>
              )}
              {availableTimes &&
                availableTimes.map((time, i) => (
                  <div
                    onClick={() => {
                      handleChange({ target: { name: 'time', value: time } });
                    }}
                    key={i}
                    className={`${classes['time-element']} ${
                      formData.time === time ? classes['time-selected'] : ''
                    }`}
                  >
                    {time}
                  </div>
                ))}
            </div>
          </div>
          <div className={classes['form-control']}>
            <div className={classes['appointments-available']}>
              Confirm your appointment:
            </div>
            <div className={classes['inline-form']}>
              <Label htmlFor="fullName" className={classes['inline-label']}>
                Full Name:
              </Label>
              <Input
                onChange={handleChange}
                id="fullName"
                name="name"
                type="text"
                className={classes['input']}
                value={formData.name}
              />
            </div>
            <div className={classes['inline-form']}>
              <Label htmlFor="phone" className={classes['inline-label']}>
                Phone:
              </Label>
              <Input
                onChange={handleChange}
                id="phone"
                name="phone"
                type="tel"
                className={classes['input']}
                value={formData.phone}
              />
            </div>
            <div className={classes['inline-form']}>
              <Label htmlFor="email" className={classes['inline-label']}>
                Email:
              </Label>
              <Input
                onChange={handleChange}
                id="email"
                type="email"
                name="email"
                className={classes['input']}
                value={formData.email}
              />
            </div>
            {error && (
              <AlertBox type="error" title="Error!" message={error} closable />
            )}
            {success && (
              <AlertBox
                type="success"
                title="Success!"
                message={success}
                closable
              />
            )}
            {formData.time &&
              formData.date &&
              formData.employee &&
              formData.service && (
                <Button
                  onClick={handleSubmitForm}
                  disabled={loading}
                  className={classes.confirm}
                >
                  {loading ? <Spinner /> : 'Confirm'}
                </Button>
              )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AppointmentForm;
