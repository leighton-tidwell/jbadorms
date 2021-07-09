import React, { useEffect, useState } from "react";

import classes from "./Calendar.module.css";
import moment from "moment";

import ArrowLeft from "../../../images/calendar-arrow-left.svg";
import ArrowRight from "../../../images/calendar-arrow-right.svg";

const Calendar = (props) => {
  const today = moment();

  const [dateObject, setDateObject] = useState({
    dateObj: moment(),
  });

  const shortWeekDays = () => {
    const listOfWeekDays = moment.weekdaysShort();
    return (
      <div className={classes["week-day-header"]}>
        {listOfWeekDays.map((weekDay) => (
          <div key={weekDay} className={classes["week-day"]}>
            {weekDay}
          </div>
        ))}
      </div>
    );
  };

  const firstDayOfMonth = () => {
    return moment(dateObject.dateObj).startOf("month").format("d");
  };

  const daysInMonth = () => {
    return moment(dateObject.dateObj).daysInMonth();
  };

  const currentDay = () => {
    return moment(dateObject.dateObj).format("D");
  };

  const currentMonth = () => {
    return moment(dateObject.dateObj).format("MMMM");
  };

  const currentYear = () => {
    return moment(dateObject.dateObj).year();
  };

  const [selectedDate, setSelectedDate] = useState({
    day: currentDay(),
    month: currentMonth(),
    year: currentYear(),
  });

  // generate blank dates
  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<div className={classes["calendar-day empty"]}>{""}</div>);
  }

  // generate days in month
  let daysInMonthList = [];
  for (let d = 1; d < daysInMonth(); d++) {
    const currentDayCheck =
      d === +currentDay() && today.format("MMMM") === currentMonth()
        ? "today"
        : "";
    const selectedDayCheck =
      d === selectedDate.day && currentMonth() === selectedDate.month
        ? "selected"
        : "";
    daysInMonthList.push(
      <div
        key={d}
        onClick={(e) => {
          handleDayClick(e, d);
        }}
        className={`${classes["calendar-day"]} ${classes[currentDayCheck]} ${classes[selectedDayCheck]}`}
      >
        {d}
      </div>
    );
  }

  const totalCalendarSlots = [...blanks, ...daysInMonthList];

  const handlePrevious = () => {
    setDateObject((prevState) => ({
      dateObj: prevState.dateObj.subtract(1, "month"),
    }));
  };

  const handleNext = () => {
    setDateObject((prevState) => ({
      dateObj: prevState.dateObj.add(1, "month"),
    }));
  };

  const handleDayClick = (event, day) => {
    setSelectedDate({
      day: day,
      month: currentMonth(),
      year: currentYear(),
    });
  };

  useEffect(() => {
    props.onDateChange(selectedDate);
  }, [selectedDate]);

  return (
    <div className={classes.calendar}>
      <div className={classes["month-picker"]}>
        <div onClick={handlePrevious} className={classes.previous}>
          <img alt="change month back one" src={ArrowLeft} />
        </div>
        <div className={classes["month-title"]}>{currentMonth()}</div>
        <div onClick={handleNext} className={classes.next}>
          <img alt="change month forward one" src={ArrowRight} />
        </div>
      </div>
      {shortWeekDays()}
      <div className={classes["calendar-grid"]}>{totalCalendarSlots}</div>
    </div>
  );
};

export default Calendar;
