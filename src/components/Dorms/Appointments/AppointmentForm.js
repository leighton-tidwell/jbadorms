import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createAppointments } from '../../../graphql/mutations';
import { listAppointments, listUsers } from '../../../graphql/queries';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import classes from './AppointmentForm.module.css';
import Select from '../../UI/Select';
import Calendar from '../../UI/Calendar/Calendar';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Label from '../../UI/Label';
import Form from '../../UI/Form';
import SuccessText from '../../UI/SuccessText';
import ErrorText from '../../UI/ErrorText';

const AppointmentForm = ({ name, phone, email }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState('Check In');
  const [employeeOpts, setEmployeeOpts] = useState([]);
  const serviceOptions = [
    { value: 'Check In', id: uuid() },
    { value: 'Check Out', id: uuid() },
    { value: 'Inspection', id: uuid() }
  ];
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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
  const [availableTimes, setAvailableTimes] = useState(availableTimesDefault);

  const [enteredName, setEnteredName] = useState(name);
  const [enteredPhone, setEnteredPhone] = useState(phone);
  const [enteredEmail, setEnteredEmail] = useState(email);

  const handleSelectService = selectedValue => {
    setSelectedService(selectedValue);
  };

  const handleSelectEmployee = selectedValue => {
    setSelectedEmployee(selectedValue);
  };

  const handleDateSelect = async dateObject => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const appointmentDateObject = new Date(
      `${dateObject.month} ${dateObject.day}, ${dateObject.year}`
    );
    const selectedDateInPast =
      currentDate.getTime() > appointmentDateObject.getTime();

    if (selectedDateInPast) return setAvailableTimes(null);

    setSelectedDate(dateObject);
  };

  const findAvailableAppointmentsForEmployee = async () => {
    const employeeEmail = employeeOpts.find(
      employee => employee.value === selectedEmployee
    ).email;

    const appointmentDateObject = new Date(
      `${selectedDate.month} ${selectedDate.day}, ${selectedDate.year}`
    );
    const month = ('0' + (appointmentDateObject.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.day).slice(-2);

    const existingAppointments = await API.graphql(
      graphqlOperation(listAppointments, {
        filter: {
          and: [
            {
              dateOfAppointment: { eq: `${selectedDate.year}-${month}-${day}` }
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

  const handleTimeSelect = time => {
    setSelectedTime(time);
  };

  const handleChangeName = event => {
    setEnteredName(event.target.value);
  };

  const handleChangePhone = event => {
    setEnteredPhone(event.target.value);
  };

  const handleChangeEmail = event => {
    setEnteredEmail(event.target.value);
  };

  const handleSubmitForm = async event => {
    event.preventDefault();
    setError(null);
    if (!selectedEmployee) return setError('You must pick an employee!');
    if (!selectedService) return setError('You must pick a service!');
    if (!enteredEmail) return setError('You must provide your email.');
    if (!enteredPhone) return setError('You must provide your phone number.');
    if (!enteredName) return setError('You must provide your name!');

    const appointmentDateObject = new Date(
      `${selectedDate.month} ${selectedDate.day}, ${selectedDate.year}`
    );

    const month = ('0' + (appointmentDateObject.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.day).slice(-2);

    const employeeEmail = employeeOpts.find(
      employee => employee.value === selectedEmployee
    ).email;

    const expiryDate = Math.round(new Date().getTime() / 1000);

    const newAppointment = {
      service: selectedService,
      employeeName: selectedEmployee,
      employeeEmail: employeeEmail,
      dateOfAppointment: `${selectedDate.year}-${month}-${day}`,
      timeOfAppointment: selectedTime,
      nameOfResident: enteredName,
      emailOfResident: enteredEmail,
      phoneOfResident: enteredPhone,
      expiryTime: expiryDate
    };
    try {
      const newAppointmentQuery = API.graphql(
        graphqlOperation(createAppointments, { input: newAppointment })
      );
      setSuccess('Your appointment was scheduled successfully!');
    } catch (error) {
      setError('An error has occured.');
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
      value: staff.name,
      email: staff.email
    }));

    setEmployeeOpts(filteredStaffList);
  };

  useEffect(() => {
    getStaffList();
  }, []);

  useEffect(() => {
    if (selectedEmployee) findAvailableAppointmentsForEmployee();
  }, [selectedEmployee, selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.flex}>
      <Form onSubmit={handleSubmitForm} className={classes.form}>
        <div className={classes['first-step']}>
          <div className={classes['form-control']}>
            <Label className={classes.label}>Select Service:</Label>
            <Select
              className={classes.select}
              options={serviceOptions}
              onSelect={handleSelectService}
            />
          </div>
          <div className={classes['form-control']}>
            <Label className={classes.label}>Select Employee:</Label>
            <Select
              className={classes.select}
              options={employeeOpts}
              onSelect={handleSelectEmployee}
              value={selectedEmployee}
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
              {selectedDate
                ? `Available times on ${selectedDate.month} ${selectedDate.day}, ${selectedDate.year}:`
                : ''}
            </div>
            <div className={classes['time-selector']}>
              {!availableTimes && (
                <div className={classes['no-time-available']}>
                  No available times
                </div>
              )}
              {availableTimes &&
                availableTimes.map((time, i) => (
                  <div
                    onClick={() => {
                      handleTimeSelect(time);
                    }}
                    key={i}
                    className={`${classes['time-element']} ${
                      selectedTime === time ? classes['time-selected'] : ''
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
            <form onSubmit={handleSubmitForm}>
              <div className={classes['inline-form']}>
                <Label htmlFor="fullName" className={classes['inline-label']}>
                  Full Name:
                </Label>
                <Input
                  onChange={handleChangeName}
                  id="fullName"
                  type="text"
                  className={classes['input']}
                  value={enteredName}
                />
              </div>
              <div className={classes['inline-form']}>
                <Label htmlFor="phone" className={classes['inline-label']}>
                  Phone:
                </Label>
                <Input
                  onChange={handleChangePhone}
                  id="phone"
                  type="tel"
                  className={classes['input']}
                  value={enteredPhone}
                />
              </div>
              <div className={classes['inline-form']}>
                <Label htmlFor="email" className={classes['inline-label']}>
                  Email:
                </Label>
                <Input
                  onChange={handleChangeEmail}
                  id="email"
                  type="email"
                  className={classes['input']}
                  value={enteredEmail}
                />
              </div>
              {error && <ErrorText>{error}</ErrorText>}
              {success && <SuccessText>{success}</SuccessText>}
              {selectedTime && (
                <Button onClick={handleSubmitForm} className={classes.confirm}>
                  Confirm
                </Button>
              )}
            </form>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AppointmentForm;
