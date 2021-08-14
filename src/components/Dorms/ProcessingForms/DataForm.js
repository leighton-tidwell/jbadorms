import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';

import classes from './DataForm.module.css';

import Input from '../../UI/Input';
import Select from '../../UI/Select';
import Button from '../../UI/Button';
import ErrorText from '../../UI/ErrorText';
import SuccessText from '../../UI/SuccessText';

const DataForm = ({
  userName,
  userEmail,
  userPhone,
  wings,
  units,
  ranks,
  onSubmit
}) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // State values
  const [name, setName] = useState(userName);
  const [phone, setPhone] = useState(userPhone);
  const [email, setEmail] = useState(userEmail);
  const [dod, setDod] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('MALE');
  const [rank, setRank] = useState('E1');
  const [dateOfRank, setDateOfRank] = useState('');
  const [dateEnteredMilitary, setDateEnteredMilitary] = useState('');
  const [wingOptions, setWingOptions] = useState([
    {
      id: uuid(),
      value: '89 AIRLIFT WING'
    },
    {
      id: uuid(),
      value: '316 WING'
    }
  ]);
  const [wing, setWing] = useState(wingOptions[0].value);
  const unitsOptionsDefault = [
    {
      id: uuid(),
      value: '316 OPERATIONS GROUP',
      wing: '316 WING'
    },
    {
      id: uuid(),
      value: '89 COMMUNICATIONS SQUADRON',
      wing: '89 AIRLIFT WING'
    },
    {
      id: uuid(),
      value: '89 COMMUNICATIONS',
      wing: '89 AIRLIFT WING'
    },
    {
      id: uuid(),
      value: '316 OPS GROUP',
      wing: '316 WING'
    }
  ];
  const [unitOptions, setUnitOptions] = useState(
    unitsOptionsDefault.filter(unit => unit.wing === wing)
  );
  const [unit, setUnit] = useState(unitOptions[0].value);
  const [officeSymbol, setOfficeSymbol] = useState('');
  const [flight, setFlight] = useState('');
  const [dutyPhone, setDutyPhone] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [supervisorPhone, setSupervisorPhone] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorPhone, setSponsorPhone] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [expectedArrivalDate, setExpectedArrivalDate] = useState('');

  const genderOptions = [
    {
      id: uuid(),
      value: 'MALE'
    },
    {
      id: uuid(),
      value: 'FEMALE'
    }
  ];

  const rankOptions = [
    {
      id: uuid(),
      value: 'E1'
    },
    {
      id: uuid(),
      value: 'E2'
    },
    {
      id: uuid(),
      value: 'E3'
    },
    {
      id: uuid(),
      value: 'E4'
    }
  ];

  const handleChangeDOD = event => {
    setDod(event.target.value);
  };

  const handleChangeDOB = event => {
    setDob(event.target.value);
  };

  const handleChangeGender = option => {
    setGender(option);
  };

  const handleChangeRank = option => {
    setRank(option);
  };

  const handleChangeDateOfRank = event => {
    setDateOfRank(event.target.value);
  };

  const handleChangeDateEnteredMilitary = event => {
    setDateEnteredMilitary(event.target.value);
  };

  const handleChangeWing = option => {
    console.log(option);
    setWing(option);
    setUnitOptions(unitsOptionsDefault.filter(unit => unit.wing === option));
  };

  const handleChangeUnit = option => {
    setUnit(option);
  };

  const handleChangeOfficeSymbol = event => {
    setOfficeSymbol(event.target.value);
  };

  const handleChangeFlight = event => {
    setFlight(event.target.value);
  };

  const handleChangeDutyPhone = event => {
    setDutyPhone(event.target.value);
  };

  const handleChangeSupervisorName = event => {
    setSupervisorName(event.target.value);
  };

  const handleChangeSupervisorPhone = event => {
    setSupervisorPhone(event.target.value);
  };

  const handleChangeSponsorName = event => {
    setSponsorName(event.target.value);
  };

  const handleChangeSponsorPhone = event => {
    setSponsorPhone(event.target.value);
  };

  const handleChangeCarMake = event => {
    setCarMake(event.target.value);
  };

  const handleChangeCarModel = event => {
    setCarModel(event.target.value);
  };

  const handleChangeCarYear = event => {
    setCarYear(event.target.value);
  };

  const handleChangeLicensePlateNumber = event => {
    setLicensePlate(event.target.value);
  };

  const handleChangeExpectedArrivalDate = event => {
    setExpectedArrivalDate(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const expiryDate = Math.round(new Date().getTime() / 1000);

    const formData = {
      name: name,
      email: email,
      phone: phone,
      dodId: dod,
      dob: dob,
      sex: gender,
      rank: rank,
      dateOfRank: dateOfRank,
      dateEnteredMilitary: dateEnteredMilitary,
      wing: wing,
      unit: unit,
      officeSymbol: officeSymbol,
      flight: flight,
      dutyPhone: dutyPhone,
      supervisorName: supervisorName,
      supervisorPhone: supervisorPhone,
      sponsorName: sponsorName,
      sponsorPhone: sponsorPhone,
      carMake: carMake,
      carModel: carModel,
      carYear: carYear,
      licensePlateNumber: licensePlate,
      expectedArrivalDate: expectedArrivalDate,
      _ttl: expiryDate
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className={classes.form}>
      <div className={classes.title}>Assignment Data Form</div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Name:</label>
        <Input
          className={classes.input}
          value={name}
          type="text"
          disabled
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Phone:</label>
        <Input
          className={classes.input}
          value={phone}
          type="tel"
          disabled
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Email:</label>
        <Input
          className={classes.input}
          value={email}
          type="email"
          disabled
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>DOD ID:</label>
        <Input
          className={classes.input}
          value={dod}
          onChange={handleChangeDOD}
          type="number"
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>DOB:</label>
        <Input
          className={classes.input}
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
          value={dob}
          onChange={handleChangeDOB}
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Gender:</label>
        <Select
          className={classes.select}
          onSelect={handleChangeGender}
          options={genderOptions}
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Rank:</label>
        <Select
          className={classes.select}
          options={rankOptions}
          onSelect={handleChangeRank}
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Date of Rank:</label>
        <Input
          className={classes.input}
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
          value={dateOfRank}
          onChange={handleChangeDateOfRank}
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Date Entered Military:</label>
        <Input
          className={classes.input}
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
          value={dateEnteredMilitary}
          onChange={handleChangeDateEnteredMilitary}
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Wing:</label>
        <Select
          className={classes.select}
          options={wingOptions}
          onSelect={handleChangeWing}
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Unit:</label>
        <Select
          className={classes.select}
          options={unitOptions}
          onSelect={handleChangeUnit}
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Office Symbol:</label>
        <Input
          className={classes.input}
          type="text"
          value={officeSymbol}
          onChange={handleChangeOfficeSymbol}
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Flight (optional):</label>
        <Input
          className={classes.input}
          type="text"
          value={flight}
          onChange={handleChangeFlight}
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Duty Phone:</label>
        <Input
          className={classes.input}
          type="tel"
          value={dutyPhone}
          onChange={handleChangeDutyPhone}
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Supervisor Name:</label>
        <Input
          className={classes.input}
          type="text"
          value={supervisorName}
          onChange={handleChangeSupervisorName}
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Supervisor Phone:</label>
        <Input
          className={classes.input}
          type="tel"
          value={supervisorPhone}
          onChange={handleChangeSupervisorPhone}
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Sponsor Name:</label>
        <Input
          className={classes.input}
          type="text"
          value={sponsorName}
          onChange={handleChangeSponsorName}
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Sponsor Phone:</label>
        <Input
          className={classes.input}
          type="tel"
          value={sponsorPhone}
          onChange={handleChangeSponsorPhone}
          required
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Car Make:</label>
        <Input
          className={classes.input}
          type="text"
          value={carMake}
          onChange={handleChangeCarMake}
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Car Model:</label>
        <Input
          className={classes.input}
          type="text"
          value={carModel}
          onChange={handleChangeCarModel}
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Car Year:</label>
        <Input
          className={classes.input}
          type="text"
          value={carYear}
          onChange={handleChangeCarYear}
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>License Plate Number:</label>
        <Input
          className={classes.input}
          type="text"
          value={licensePlate}
          onChange={handleChangeLicensePlateNumber}
        />
      </div>
      <div className={classes['form-control']}>
        <label className={classes.label}>Expected Arrival Date:</label>
        <Input
          className={classes.input}
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
          value={expectedArrivalDate}
          onChange={handleChangeExpectedArrivalDate}
        />
      </div>
      {error && <ErrorText>{error}</ErrorText>}
      {success && <SuccessText>{success}</SuccessText>}
      <Button>Submit</Button>
    </form>
  );
};

export default DataForm;
