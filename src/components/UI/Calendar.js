import React from "react";
import ReactCalendar from "react-calendar";

import "./Calendar.css";

const Calendar = (props) => {
  return (
    <>
      <ReactCalendar
        minDate={new Date()}
        onChange={props.onDateChange}
        value={props.dateValue}
      />
    </>
  );
};

export default Calendar;
