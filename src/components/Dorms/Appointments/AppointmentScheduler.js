import React from 'react';

import AppointmentForm from './AppointmentForm';
const AppointmentScheduler = ({ name, phone, email }) => {
  return <AppointmentForm name={name} phone={phone} email={email} />; // calendar too
};

export default AppointmentScheduler;
