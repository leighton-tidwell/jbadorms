import { useState } from 'react';
import classes from './DataForm.module.css';
import { Input, Select, Button, AlertBox, Spinner } from '../../UI/';

const sexOptions = [
  {
    label: 'MALE',
    value: 'MALE'
  },
  {
    label: 'FEMALE',
    value: 'FEMALE'
  }
];

const rankOptions = [
  {
    label: 'E1',
    value: 'E1'
  },
  {
    label: 'E2',
    value: 'E2'
  },
  {
    label: 'E3',
    value: 'E3'
  },
  {
    label: 'E4',
    value: 'E4'
  },
  {
    label: 'E5',
    value: 'E5'
  },
  {
    label: 'E6',
    value: 'E6'
  },
  {
    label: 'E7',
    value: 'E7'
  },
  {
    label: 'E8',
    value: 'E8'
  },
  {
    label: 'E9',
    value: 'E9'
  }
];

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
  const [loading, setLoading] = useState(false);

  // State values
  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    phone: userPhone,
    dodId: '',
    dob: '',
    sex: '',
    rank: '',
    dateOfRank: '',
    dateEnteredMilitary: '',
    wing: '',
    unit: '',
    officeSymbol: '',
    flight: '',
    dutyPhone: '',
    supervisorName: '',
    supervisorPhone: '',
    sponsorName: '',
    sponsorPhone: '',
    carMake: '',
    carModel: '',
    carYear: '',
    licensePlateNumber: '',
    expectedArrivalDate: ''
  });
  const [unitOptions, setUnitOptions] = useState([]);
  const [wingOptions, setWingOptions] = useState(
    wings.map(wing => ({ label: wing.wing, value: wing.wing }))
  );

  const handleDataChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleChangeWing = option => {
    setFormData(prevData => ({ ...prevData, wing: option, unit: null }));
    setUnitOptions(
      units
        .filter(unit => unit.wing === option)
        .map(unit => ({
          label: unit.unit,
          value: unit.unit,
          wing: unit.wing
        }))
    );
  };

  const handleFormSubmit = async event => {
    setError(null);
    event.preventDefault();
    const expiryDate = Math.round(new Date().getTime() / 1000);

    if (!formData.name)
      return setError(
        'There was an error getting your name. Please contact dorm staff to have this fixed.'
      );
    if (!formData.phone)
      return setError(
        'There was an error getting your phone number. Please contact dorm staff to have this fixed.'
      );
    if (!formData.email)
      return setError(
        'There was an error getting your email. Please contact dorm staff to have this fixed.'
      );
    if (!formData.dodId) return setError('You must enter your DOD ID.');
    if (!formData.dob) return setError('You must enter your Date Of Birth.');
    if (!formData.dob.match(/^\d{4}-\d{2}-\d{2}$/))
      return setError(
        'You must enter your date of birth in yyyy-mm-dd format.'
      );
    if (!formData.sex) return setError('You must select a sex.');
    if (!formData.rank) return setError('You must select a rank.');
    if (!formData.dateOfRank)
      return setError('You must enter you date of rank.');
    if (!formData.dateOfRank.match(/^\d{4}-\d{2}-\d{2}$/))
      return setError('You must enter your date of rank in yyyy-mm-dd format.');
    if (!formData.dateEnteredMilitary)
      return setError('You must enter the date you joined the military.');
    if (!formData.dateEnteredMilitary.match(/^\d{4}-\d{2}-\d{2}$/))
      return setError(
        'You must enter your date entered military in yyyy-mm-dd format.'
      );
    if (!formData.wing) return setError('You must select a wing.');
    // need to check unit is in wing
    if (!formData.unit) return setError('You must select a unit.');
    if (!formData.officeSymbol)
      return setError(
        'You must enter your office symbol. If you are unaware of this, please ask your sponsor.'
      );
    if (!formData.dutyPhone)
      return setError(
        'You must enter your duty phone. If you are unaware of this, please ask your sponsor.'
      );
    if (!formData.supervisorName)
      return setError("You must enter your projected supervisor's name.");
    if (!formData.supervisorPhone)
      return setError("You must enter your projected supervisor's phone.");
    if (!formData.sponsorName)
      return setError('You must enter your sponsors name.');
    if (!formData.sponsorPhone)
      return setError('You must enter your sponsors phone.');
    if (
      (formData.carMake && !formData.carModel) ||
      (formData.carMake && !formData.carYear) ||
      (formData.carMake && !formData.licensePlateNumber)
    )
      return setError(
        'You must enter all details about your car if applicable.'
      );
    if (!formData.expectedArrivalDate)
      return setError('You must enter your expected arrival date.');
    if (!formData.expectedArrivalDate.match(/^\d{4}-\d{2}-\d{2}$/))
      return setError(
        'You must enter your expected arrival date in yyyy-mm-dd format.'
      );

    setLoading(true);

    try {
      const formSubmission = {
        ...formData,
        expiryTime: expiryDate
      };

      await onSubmit(formSubmission);
      setSuccess(
        'Form has been sucessfully submitted. Please allow time for dorm staff to review your paperwork. You will recieve an email when your account has been verified, you can then move onto the next steps.'
      );
      setLoading(false);
      setFormData(prevData => ({
        name: prevData.name,
        phone: prevData.phone,
        email: prevData.email,
        dodId: '',
        dob: '',
        sex: '',
        rank: '',
        dateOfRank: '',
        dateEnteredMilitary: '',
        wing: '',
        unit: '',
        officeSymbol: '',
        flight: '',
        dutyPhone: '',
        supervisorName: '',
        supervisorPhone: '',
        sponsorName: '',
        sponsorPhone: '',
        carMake: '',
        carModel: '',
        carYear: '',
        licensePlateNumber: '',
        expectedArrivalDate: ''
      }));
    } catch (error) {
      setError(
        'An error has occured while submitting your form. Please try again later.'
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={classes.form}>
      <div className={classes.title}>Assignment Data Form</div>
      All dates should be entered in yyyy-mm-dd format.
      <h3>Contact Information</h3>
      <div className={classes.grid}>
        <div className={`${classes['form-control']} ${classes.spanThree}`}>
          <label className={classes.label}>Name:</label>
          <Input
            className={classes.input}
            value={formData.name}
            onChange={handleDataChange}
            name="name"
            type="text"
            disabled
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Phone:</label>
          <Input
            className={classes.input}
            value={formData.phone}
            onChange={handleDataChange}
            name="phone"
            type="tel"
            disabled
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanThree}`}>
          <label className={classes.label}>Email:</label>
          <Input
            className={classes.input}
            value={formData.email}
            onChange={handleDataChange}
            name="email"
            type="email"
            disabled
            required
          />
        </div>
      </div>
      <h3>Personal Information</h3>
      <div className={classes.grid}>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>DOD ID:</label>
          <Input
            className={classes.input}
            value={formData.dodId}
            onChange={handleDataChange}
            name="dodId"
            type="text"
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>DOB:</label>
          <Input
            className={classes.input}
            type="text"
            pattern="\d{4}-\d{2}-\d{2}"
            value={formData.dob}
            name="dob"
            onChange={handleDataChange}
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanThree}`}>
          <label className={classes.label}>Gender:</label>
          <Select
            className={classes.select}
            onSelect={handleDataChange}
            value={formData.sex}
            name="sex"
            options={sexOptions}
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Rank:</label>
          <Select
            className={classes.select}
            options={rankOptions}
            onSelect={handleDataChange}
            name="rank"
            value={formData.rank}
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Date of Rank:</label>
          <Input
            className={classes.input}
            type="text"
            pattern="\d{4}-\d{2}-\d{2}"
            value={formData.dateOfRank}
            onChange={handleDataChange}
            name="dateOfRank"
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Date Entered Military:</label>
          <Input
            className={classes.input}
            type="text"
            pattern="\d{4}-\d{2}-\d{2}"
            value={formData.dateEnteredMilitary}
            onChange={handleDataChange}
            name="dateEnteredMilitary"
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanThree}`}>
          <label className={classes.label}>Wing:</label>
          <Select
            className={classes.select}
            options={wingOptions}
            onSelect={handleChangeWing}
            value={formData.wing}
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanFour}`}>
          <label className={classes.label}>Unit:</label>
          <Select
            className={classes.select}
            options={unitOptions}
            onSelect={handleDataChange}
            value={formData.unit}
            name="unit"
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Office Symbol:</label>
          <Input
            className={classes.input}
            type="text"
            value={formData.officeSymbol}
            onChange={handleDataChange}
            name="officeSymbol"
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Flight (optional):</label>
          <Input
            className={classes.input}
            type="text"
            value={formData.flight}
            onChange={handleDataChange}
            name="flight"
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Duty Phone:</label>
          <Input
            className={classes.input}
            type="tel"
            value={formData.dutyPhone}
            onChange={handleDataChange}
            name="dutyPhone"
            placeholder="+13019812222"
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanThree}`}>
          <label className={classes.label}>Expected Arrival Date:</label>
          <Input
            className={classes.input}
            type="text"
            pattern="\d{4}-\d{2}-\d{2}"
            value={formData.expectedArrivalDate}
            onChange={handleDataChange}
            name="expectedArrivalDate"
          />
        </div>
      </div>
      <h3>Sponsor/Supervisor Information</h3>
      <div className={classes.grid}>
        <div className={`${classes['form-control']} ${classes.spanThree}`}>
          <label className={classes.label}>Supervisor Name:</label>
          <Input
            className={classes.input}
            type="text"
            value={formData.supervisorName}
            onChange={handleDataChange}
            name="supervisorName"
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Supervisor Phone:</label>
          <Input
            className={classes.input}
            type="tel"
            value={formData.supervisorPhone}
            onChange={handleDataChange}
            name="supervisorPhone"
            placeholder="+13019812222"
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanThree}`}>
          <label className={classes.label}>Sponsor Name:</label>
          <Input
            className={classes.input}
            type="text"
            value={formData.sponsorName}
            onChange={handleDataChange}
            name="sponsorName"
            required
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Sponsor Phone:</label>
          <Input
            className={classes.input}
            type="tel"
            value={formData.sponsorPhone}
            onChange={handleDataChange}
            name="sponsorPhone"
            placeholder="+13019812222"
            required
          />
        </div>
      </div>
      <h3>Car Information</h3>
      <div className={classes.grid}>
        <div className={`${classes['form-control']} ${classes.spanThree}`}>
          <label className={classes.label}>Car Make:</label>
          <Input
            className={classes.input}
            type="text"
            value={formData.carMake}
            onChange={handleDataChange}
            name="carMake"
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Car Model:</label>
          <Input
            className={classes.input}
            type="text"
            value={formData.carModel}
            onChange={handleDataChange}
            name="carModel"
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>Car Year:</label>
          <Input
            className={classes.input}
            type="text"
            value={formData.carYear}
            onChange={handleDataChange}
            name="carYear"
          />
        </div>
        <div className={`${classes['form-control']} ${classes.spanTwo}`}>
          <label className={classes.label}>License Plate Number:</label>
          <Input
            className={classes.input}
            type="text"
            value={formData.licensePlateNumber}
            onChange={handleDataChange}
            name="licensePlateNumber"
          />
        </div>
      </div>
      {error && (
        <AlertBox type="error" title="Error!!" message={error} closable />
      )}
      {success && (
        <AlertBox type="success" title="Success!" message={success} closable />
      )}
      <Button disabled={loading} className={classes.button}>
        {loading ? <Spinner /> : 'Submit'}
      </Button>
    </form>
  );
};

export default DataForm;
