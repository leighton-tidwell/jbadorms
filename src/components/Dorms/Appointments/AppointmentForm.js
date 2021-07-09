import React, { useState } from "react";

import classes from "./AppointmentForm.module.css";
import Select from "../../UI/Select";
import Calendar from "../../UI/Calendar/Calendar";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState("Check In");
  const [serviceOptions, setServiceOptions] = useState([
    { value: "Check In", id: 1 },
    { value: "Check Out", id: 2 },
    { value: "Inspection", id: 3 },
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState("ADL 1");
  const [employeeOptions, setEmployeeOptions] = useState([
    { value: "ADL 1", id: 1 },
    { value: "ADL 2", id: 2 },
    { value: "ADL 3", id: 3 },
    { value: "ADL 4", id: 4 },
  ]);
  const [availableTimes, setAvailableTimes] = useState([
    "0700",
    "0800",
    "0900",
    "1000",
    "1100",
    "1200",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
  ]);

  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const handleSelectService = (selectedValue) => {
    setSelectedService(selectedValue);
  };

  const handleSelectEmployee = (selectedValue) => {
    setSelectedEmployee(selectedValue);
  };

  const handleDateSelect = (dateObject) => {
    setSelectedDate(dateObject);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleChangeFirstName = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setEnteredLastName(event.target.value);
  };

  const handleChangePhone = (event) => {
    setEnteredPhone(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEnteredEmail(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log({
      selectedDate,
      selectedTime,
      selectedService,
      selectedEmployee,
      enteredFirstName,
      enteredLastName,
      enteredPhone,
      enteredEmail,
    });
  };

  return (
    <div className={classes.flex}>
      <div className={classes["first-step"]}>
        <div className={classes["form-control"]}>
          <label className={classes.label}>Select Service:</label>
          <Select
            className={classes.select}
            options={serviceOptions}
            onSelect={handleSelectService}
          />
        </div>
        <div className={classes["form-control"]}>
          <label className={classes.label}>Select Employee:</label>
          <Select
            className={classes.select}
            options={employeeOptions}
            onSelect={handleSelectEmployee}
          />
        </div>
        <div className={classes["form-control"]}>
          <label className={classes.label}>Select Date:</label>
          <Calendar onDateChange={handleDateSelect} />
        </div>
      </div>
      <div className={classes["second-step"]}>
        <div className={classes["form-control"]}>
          <div className={classes["appointments-available"]}>
            {selectedDate
              ? `Available times on ${selectedDate.month} ${selectedDate.day}, ${selectedDate.year}:`
              : ""}
          </div>
          <div className={classes["time-selector"]}>
            {availableTimes.map((time, i) => (
              <div
                onClick={() => {
                  handleTimeSelect(time);
                }}
                key={i}
                className={`${classes["time-element"]} ${
                  selectedTime === time ? classes["time-selected"] : ""
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
        <div className={classes["form-control"]}>
          <div className={classes["appointments-available"]}>
            Confirm your appointment:
          </div>
          <form onSubmit={handleSubmitForm}>
            <div className={classes["inline-form"]}>
              <label htmlFor="firstName" className={classes["inline-label"]}>
                First Name:
              </label>
              <Input
                onChange={handleChangeFirstName}
                id="firstName"
                type="text"
                className={classes["input"]}
                value={enteredFirstName}
              />
            </div>
            <div className={classes["inline-form"]}>
              <label htmlFor="lastName" className={classes["inline-label"]}>
                Last Name:
              </label>
              <Input
                onChange={handleChangeLastName}
                id="lastName"
                type="text"
                className={classes["input"]}
                value={enteredLastName}
              />
            </div>
            <div className={classes["inline-form"]}>
              <label htmlFor="phone" className={classes["inline-label"]}>
                Phone:
              </label>
              <Input
                onChange={handleChangePhone}
                id="phone"
                type="tel"
                className={classes["input"]}
                value={enteredPhone}
              />
            </div>
            <div className={classes["inline-form"]}>
              <label htmlFor="email" className={classes["inline-label"]}>
                Email:
              </label>
              <Input
                onChange={handleChangeEmail}
                id="email"
                type="email"
                className={classes["input"]}
                value={enteredEmail}
              />
            </div>
            <Button className={classes.confirm}>Confirm</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
