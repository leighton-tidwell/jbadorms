import React, { useState } from "react";
import uuid from "react-uuid";

import Input from "../../UI/Input";
import Select from "../../UI/Select";
import Button from "../../UI/Button";

import classes from "./IncomingAirmenChecklist.module.css";

const ProcessingForm = (props) => {
  const [enteredFullName, setEnteredFullName] = useState("");
  const handleChangeName = (event) => {
    setEnteredFullName(event.target.value);
  };

  const rankOptions = [
    { value: "E1", id: uuid() },
    { value: "E2", id: uuid() },
    { value: "E3", id: uuid() },
    { value: "E4", id: uuid() },
  ];

  return (
    <form>
      <div className={classes.title}>Incoming Airmen Checklist</div>
      <div className={classes["form-control"]}>
        <label className={classes.label}>Full Name:</label>
        <Input
          className={classes.input}
          onChange={handleChangeName}
          id="fullName"
          type="text"
          value={enteredFullName}
        />
      </div>
      <div className={classes["form-control"]}>
        <label className={classes.label}>Phone:</label>
        <Input className={classes.input} id="phone" type="tel" />
      </div>
      <div className={classes["form-control"]}>
        <label className={classes.label}>DOD ID#:</label>
        <Input className={classes.input} id="dodId" type="text" />
      </div>
      <div className={classes["form-control"]}>
        <label className={classes.label}>Rank</label>
        <Select className={classes.select} options={rankOptions} />
      </div>
      <Button>Submit</Button>
    </form>
  );
};

export default ProcessingForm;
