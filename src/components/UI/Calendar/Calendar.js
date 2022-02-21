import { useState } from 'react';
import uuid from 'react-uuid';
import classes from './Calendar.module.css';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.tz.setDefault('America/New_York');

import { Icon } from '../';

const Calendar = ({ onDateChange }) => {
  const today = dayjs();
  const [dayDateObject, setDayDateObject] = useState(dayjs.tz());
  const [selectedDate, setSelectedDate] = useState({
    day: '',
    month: '',
    year: ''
  });

  const shortWeekDays = () => {
    const listOfWeekDays = dayjs.weekdaysShort();
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
    return dayDateObject.startOf('month').format('d');
  };

  const daysInMonth = () => {
    return dayDateObject.daysInMonth();
  };

  const currentMonth = () => {
    return dayDateObject.format('MMMM');
  };

  const currentYear = () => {
    return dayDateObject.format('YYYY');
  };

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
  for (let day = 1; day <= daysInMonth(); day++) {
    const currentDayCheck =
      day === Number(today.format('D')) &&
      today.format('MMMM') === currentMonth()
        ? true
        : false;

    const selectedDayCheck =
      day === selectedDate.day && currentMonth() === selectedDate.month
        ? true
        : false;

    const thisDateObject = dayjs(
      `${dayDateObject.format('MM')}/${day}/${dayDateObject.format('YYYY')}`,
      'MM/DD/YYYY'
    );

    const weekendCheck =
      thisDateObject.format('ddd') === 'Sat' ||
      thisDateObject.format('ddd') === 'Sun'
        ? true
        : false;

    const dayInPast =
      !currentDayCheck && today.diff(thisDateObject) > 0 ? true : false;

    daysInMonthList.push(
      <div
        key={uuid()}
        onClick={e =>
          !weekendCheck || !dayInPast ? handleDayClick(e, day) : null
        }
        className={`${classes['calendar-day']} ${
          currentDayCheck ? classes.today : ''
        } ${selectedDayCheck ? classes.selected : ''} ${
          weekendCheck || dayInPast ? classes['disabled'] : ''
        }`}
      >
        {day}
      </div>
    );
  }

  const totalCalendarSlots = [...blanks, ...daysInMonthList];

  const handlePrevious = () => {
    setDayDateObject(prevDate =>
      prevDate.startOf('month').subtract(1, 'month')
    );
  };

  const handleNext = () => {
    setDayDateObject(prevDate => prevDate.startOf('month').add(1, 'month'));
  };

  const handleDayClick = (event, day) => {
    setSelectedDate({
      day: day,
      month: currentMonth(),
      year: currentYear()
    });
    onDateChange({
      day: day,
      month: currentMonth(),
      year: currentYear()
    });
  };

  return (
    <div className={classes.calendar}>
      <div className={classes['month-picker']}>
        <div onClick={handlePrevious} className={classes.previous}>
          <Icon name="arrowBackIosSharp" />
        </div>
        <div className={classes['month-title']}>{currentMonth()}</div>
        <div onClick={handleNext} className={classes.next}>
          <Icon name="arrowForwardIosSharp" />
        </div>
      </div>
      {shortWeekDays()}
      <div className={classes['calendar-grid']}>{totalCalendarSlots}</div>
    </div>
  );
};

export default Calendar;
