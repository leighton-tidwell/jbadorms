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
  const [wingOptions, setWingOptions] = useState(
    wings.map(wing => ({ id: wing.id, value: wing.wing }))
  );
  const [wing, setWing] = useState(wingOptions[0].value);
  const unitsOptionsDefault = units.map(unit => ({
    id: unit.id,
    value: unit.unit,
    wing: unit.wing
  }));
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
    },
    {
      id: uuid(),
      value: 'E5'
    },
    {
      id: uuid(),
      value: 'E6'
    },
    {
      id: uuid(),
      value: 'E7'
    },
    {
      id: uuid(),
      value: 'E8'
    },
    {
      id: uuid(),
      value: 'E9'
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
    setError(null);
    event.preventDefault();
    const expiryDate = Math.round(new Date().getTime() / 1000);

    if (!name)
      return setError(
        'There was an error getting your name. Please contact dorm staff to have this fixed.'
      );
    if (!phone)
      return setError(
        'There was an error getting your phone number. Please contact dorm staff to have this fixed.'
      );
    if (!email)
      return setError(
        'There was an error getting your email. Please contact dorm staff to have this fixed.'
      );
    if (!dod) return setError('You must enter your DOD ID.');
    if (!dob) return setError('You must enter your Date Of Birth.');
    if (!dob.match(/^\d{4}-\d{2}-\d{2}$/))
      return setError(
        'You must enter your date of birth in yyyy-mm-dd format.'
      );
    if (!gender) return setError('You must select a gender.');
    if (!rank) return setError('You must select a rank.');
    if (!dateOfRank) return setError('You must enter you date of rank.');
    if (!dateOfRank.match(/^\d{4}-\d{2}-\d{2}$/))
      return setError('You must enter your date of rank in yyyy-mm-dd format.');
    if (!dateEnteredMilitary)
      return setError('You must enter the date you joined the military.');
    if (!dateEnteredMilitary.match(/^\d{4}-\d{2}-\d{2}$/))
      return setError(
        'You must enter your date entered military in yyyy-mm-dd format.'
      );
    if (!wing) return setError('You must select a wing.');
    // need to check unit is in wing
    if (!unit) return setError('You must select a unit.');
    if (!officeSymbol)
      return setError(
        'You must enter your office symbol. If you are unaware of this, please ask your sponsor.'
      );
    if (!dutyPhone)
      return setError(
        'You must enter your duty phone. If you are unaware of this, please ask your sponsor.'
      );
    if (!supervisorName)
      return setError("You must enter your projected supervisor's name.");
    if (!supervisorPhone)
      return setError("You must enter your projected supervisor's phone.");
    if (!sponsorName) return setError('You must enter your sponsors name.');
    if (!sponsorPhone) return setError('You must enter your sponsors phone.');
    if (
      (carMake && !carModel) ||
      (carMake && !carYear) ||
      (carMake && !licensePlate)
    )
      return setError(
        'You must enter all details about your car if applicable.'
      );
    if (!expectedArrivalDate)
      return setError('You must enter your expected arrival date.');
    if (!expectedArrivalDate.match(/^\d{4}-\d{2}-\d{2}$/))
      return setError(
        'You must enter your expected arrival date in yyyy-mm-dd format.'
      );

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
      expiryTime: expiryDate
    };

    onSubmit(formData);
    setSuccess(
      'Form has been sucessfully submitted. Please allow time for dorm staff to review your paperwork. You will recieve an email when your account has been verified, you can then move onto the next steps.'
    );
  };

  return (
    <form onSubmit={handleFormSubmit} className={classes.form}>
      <div className={classes.title}>Assignment Data Form</div>
      All dates should be entered in yyyy-mm-dd format.
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
          value={unit}
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
          placeholder="+13019812222"
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
          placeholder="+13019812222"
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
          placeholder="+13019812222"
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
      <Button className={classes.button}>Submit</Button>
    </form>
  );
};

export default DataForm;
