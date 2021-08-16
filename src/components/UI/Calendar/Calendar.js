import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

import classes from './Calendar.module.css';
import moment from 'moment';

const Calendar = props => {
  const today = moment();

  const arrows = {
    arrowLeft: '/images/calendar-arrow-left.svg',
    arrowRight: '/images/calendar-arrow-right.svg'
  };

  const [dateObject, setDateObject] = useState({
    dateObj: moment()
  });

  moment.addRealMonth = d => {
    let fm = moment(d).add(1, 'M');
    let fmEnd = moment(fm).endOf('month');
    return d.date() != fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD'))
      ? fm.add(1, 'd')
      : fm;
  };

  moment.subtractRealMonth = d => {
    let fm = moment(d).subtract(1, 'M');
    let fmEnd = moment(fm).endOf('month');
    return d.date() != fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD'))
      ? fm.subtract(1, 'd')
      : fm;
  };

  const shortWeekDays = () => {
    const listOfWeekDays = moment.weekdaysShort();
    return (
      <div className={classes['week-day-header']}>
        {listOfWeekDays.map(weekDay => (
          <div key={uuid()} className={classes['week-day']}>
            {weekDay}
          </div>
        ))}
      </div>
    );
  };

  const firstDayOfMonth = () => {
    return moment(dateObject.dateObj).startOf('month').format('d');
  };

  const daysInMonth = () => {
    return moment(dateObject.dateObj).daysInMonth();
  };

  const currentDay = () => {
    return moment(dateObject.dateObj).format('D');
  };

  const currentMonth = () => {
    return moment(dateObject.dateObj).format('MMMM');
  };

  const currentYear = () => {
    return moment(dateObject.dateObj).year();
  };

  const [selectedDate, setSelectedDate] = useState({
    day: currentDay(),
    month: currentMonth(),
    year: currentYear()
  });

  // generate blank dates
  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(
      <div key={uuid()} className={classes['calendar-day empty']}>
        {''}
      </div>
    );
  }

  // generate days in month
  let daysInMonthList = [];
  for (let d = 1; d < daysInMonth(); d++) {
    const currentDayCheck =
      d === +currentDay() && today.format('MMMM') === currentMonth()
        ? 'today'
        : '';
    const selectedDayCheck =
      d === selectedDate.day && currentMonth() === selectedDate.month
        ? 'selected'
        : '';
    daysInMonthList.push(
      <div
        key={uuid()}
        onClick={e => {
          handleDayClick(e, d);
        }}
        className={`${classes['calendar-day']} ${classes[currentDayCheck]} ${classes[selectedDayCheck]}`}
      >
        {d}
      </div>
    );
  }

  const totalCalendarSlots = [...blanks, ...daysInMonthList];

  const handlePrevious = () => {
    setDateObject(prevState => ({
      dateObj: moment.subtractRealMonth(prevState.dateObj)
    }));
  };

  const handleNext = () => {
    setDateObject(prevState => ({
      dateObj: moment.addRealMonth(prevState.dateObj)
    }));
  };

  const handleDayClick = (event, day) => {
    setSelectedDate({
      day: day,
      month: currentMonth(),
      year: currentYear()
    });
    props.onDateChange({
      day: day,
      month: currentMonth(),
      year: currentYear()
    });
  };

  useEffect(() => {
    props.onDateChange(selectedDate);
  }, []);

  return (
    <div className={classes.calendar}>
      <div className={classes['month-picker']}>
        <div onClick={handlePrevious} className={classes.previous}>
          <img alt="change month back one" src={arrows.arrowLeft} />
        </div>
        <div className={classes['month-title']}>{currentMonth()}</div>
        <div onClick={handleNext} className={classes.next}>
          <img alt="change month forward one" src={arrows.arrowRight} />
        </div>
      </div>
      {shortWeekDays()}
      <div className={classes['calendar-grid']}>{totalCalendarSlots}</div>
    </div>
  );
};

export default Calendar;
