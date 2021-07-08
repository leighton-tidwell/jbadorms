import React, { useState } from "react";

import classes from "./AppointmentTimePicker.module.css";
import moment from "moment";
import { useEffect } from "react/cjs/react.development";

const AppointmentTimePicker = (props) => {
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    setAvailableTimes([
      {
        value: `${moment(props.selectedDate)
          .add(9, "hours")
          .format("HH:mm")} - ${moment(props.selectedDate)
          .add(10, "hours")
          .format("HH:mm")}`,
        id: 112313123,
      },
      {
        value: `${moment(props.selectedDate)
          .add(11, "hours")
          .format("HH:mm")} - ${moment(props.selectedDate)
          .add(12, "hours")
          .format("HH:mm")}`,
        id: 112313123,
      },
      {
        value: `${moment(props.selectedDate)
          .add(13, "hours")
          .format("HH:mm")} - ${moment(props.selectedDate)
          .add(14, "hours")
          .format("HH:mm")}`,
        id: 112313123,
      },
      {
        value: `${moment(props.selectedDate)
          .add(15, "hours")
          .format("HH:mm")} - ${moment(props.selectedDate)
          .add(16, "hours")
          .format("HH:mm")}`,
        id: 112313123,
      },
    ]);
  }, [props.selectedDate]);

  const handleTimeClicked = (event) => {
    props.changeTime(event.target.innerHTML);
  };

  return (
    <div className={classes["time-container"]}>
      <ul>
        {availableTimes.map((time) => (
          <li onClick={handleTimeClicked} key={time.id}>
            {time.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentTimePicker;
