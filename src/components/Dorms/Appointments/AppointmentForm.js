import React, { useState } from "react";

import classes from "./AppointmentForm.module.css";
import Select from "../../UI/Select";
import Calendar from "../../UI/Calendar";
import AppointmentTimePicker from "./AppointmentTimePicker";
import moment from "moment";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [parsedSelectedTime, setParsedSelectedTime] = useState([]);
  const [selectedService, setSelectedService] = useState("Check In");
  const [serviceOptions, setServiceOptions] = useState([
    { value: "Check In", id: 1 },
    { value: "Check Out", id: 2 },
    { value: "Inspection", id: 3 },
  ]);
  const [enteredFullName, setEnteredFullName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState("ADL 1");
  const [employeeOptions, setEmployeeOptions] = useState([
    { value: "ADL 1", id: 1 },
    { value: "ADL 2", id: 2 },
    { value: "ADL 3", id: 3 },
    { value: "ADL 4", id: 4 },
  ]);

  const handleSelectService = (selectedValue) => {
    setSelectedService(selectedValue);
  };

  const handleSelectEmployee = (selectedValue) => {
    setSelectedEmployee(selectedValue);
  };

  const handleSelectedTime = (userSelectedTime) => {
    setSelectedTime(userSelectedTime);
    const hourRangeOfSelectedTime = userSelectedTime.split(" - ");
    const firstHour = hourRangeOfSelectedTime[0].split(":")[0];
    const secondHour = hourRangeOfSelectedTime[1].split(":")[0];
    setParsedSelectedTime([
      `${moment(selectedDate)
        .add(+firstHour, "hours")
        .format("MMM Do YYYY HH:mm")}`,
      `${moment(selectedDate)
        .add(+secondHour, "hours")
        .format("MMM Do YYYY HH:mm")}`,
    ]);
  };

  const handleChangeFullName = (event) => {
    setEnteredFullName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEnteredEmail(event.target.value);
  };

  const handleChangePhoneNumber = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log({
      employee: selectedEmployee,
      appointmentTime: parsedSelectedTime[0],
      fullName: enteredFullName,
      email: enteredEmail,
      phone: enteredPhoneNumber,
    });
  };

  return (
    <div className={classes.form}>
      <div className={classes["form-control"]}>
        <label className={classes.label}>Select Service</label>
        <Select
          className={classes.select}
          options={serviceOptions}
          onSelect={handleSelectService}
        />
      </div>
      <div className={classes["form-control"]}>
        <label className={classes.label}>Select Employee</label>
        <Select
          className={classes.select}
          options={employeeOptions}
          onSelect={handleSelectEmployee}
        />
      </div>
      <div className={classes["calendar-time-picker"]}>
        <div className={classes["calendar-form-control"]}>
          <label className={classes.label}>Select A Date</label>
          <Calendar onDateChange={setSelectedDate} dateValue={selectedDate} />
        </div>
        <div className={classes["calendar-form-control"]}>
          <label className={classes.label}>
            Appointments for {selectedEmployee} on{" "}
            {moment(selectedDate).format("MMM Do YYYY")}
          </label>
          <AppointmentTimePicker
            selectedDate={selectedDate}
            changeTime={handleSelectedTime}
          />
        </div>
      </div>
      {selectedTime && (
        <div className={classes["contact-information"]}>
          <div className={classes["appointment-confirmation"]}>
            <label className={classes.label}>Confirm your appointment</label>
            <div className={classes["employee"]}>
              <span>Employee: </span>
              {selectedEmployee}
            </div>
            <div className={classes["date"]}>
              <span>Date: </span>
              {parsedSelectedTime[0]}
            </div>
          </div>
          <div className={classes["confirmation-form"]}>
            <form onSubmit={handleFormSubmit}>
              <div className={classes["form-control"]}>
                <label className={classes.label}>Full Name: </label>
                <Input
                  type="text"
                  className={classes.input}
                  value={enteredFullName}
                  onChange={handleChangeFullName}
                />
              </div>
              <div className={classes["form-control"]}>
                <label className={classes.label}>Email: </label>
                <Input
                  type="email"
                  className={classes.input}
                  value={enteredEmail}
                  onChange={handleChangeEmail}
                />
              </div>
              <div className={classes["form-control"]}>
                <label className={classes.label}>Phone Number: </label>
                <Input
                  type="tel"
                  className={classes.input}
                  value={enteredPhoneNumber}
                  onChange={handleChangePhoneNumber}
                />
              </div>
              <Button type="button">Confirm</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
