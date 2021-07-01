import React, { useState } from "react";

import classes from "./AppointmentForm.module.css";
import Select from "../UI/Select";
import Calendar from "../UI/Calendar";
import moment from "moment";

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const handleSelectService = (selectedValue) => {
    setSelectedService(selectedValue);
  };

  const handleSelectEmployee = (selectedValue) => {
    setSelectedEmployee(selectedValue);
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
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
