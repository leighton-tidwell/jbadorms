import React, { useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });
import { createWings, createUnits } from '../../../graphql/mutations';

import { Content } from '../../../components/UI/';

const AddWingPage = () => {
  const [wing, setWing] = useState('');
  const [unit, setUnit] = useState('');

  const handleWingChange = event => {
    setWing(event.target.value);
  };

  const handleUnitChange = event => {
    setUnit(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    if (!wing) return;

    const createWing = await API.graphql(
      graphqlOperation(createWings, { input: { wing: wing } })
    );
  };

  const handleUnitAdd = async event => {
    event.preventDefault();
    if (!unit && !wing) return;

    const createUnit = await API.graphql(
      graphqlOperation(createUnits, { input: { unit: unit, wing: wing } })
    );
  };
  return (
    <Content>
      <form onSubmit={handleFormSubmit}>
        add wing:
        <input value={wing} onChange={handleWingChange} type="text" />
        <input type="submit" />
      </form>
      <form onSubmit={handleUnitAdd}>
        add unit to entered wing:
        <input value={unit} onChange={handleUnitChange} type="text" />
        <input type="submit" />
      </form>
    </Content>
  );
};

export default AddWingPage;
