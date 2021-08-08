import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { useAuth } from '../../../context/AuthUserProvider';
import { useRouter } from 'next/router';

import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import DefaultLayout from '../../../layouts/dorms/default';

import ProcessingNavigation from '../../../components/Dorms/ProcessingNavigation/ProcessingNavigation';
import IncomingAirmenChecklist from '../../../components/Dorms/ProcessingForms/IncomingAirmenChecklist';

import classes from './index.module.css';

const Processing = props => {
  const bannerBackgroundImage = '/images/processing_banner.png';
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const [selectedForm, setSelectedForm] = useState(<IncomingAirmenChecklist />);
  const [navOptions, setNavOptions] = useState([
    {
      id: uuid(),
      name: 'Incoming Airmen',
      active: true,
      component: <IncomingAirmenChecklist />
    },
    {
      id: uuid(),
      name: 'Assignment Data',
      active: false,
      component: <div></div>
    },
    {
      id: uuid(),
      name: 'Conditions Checklist',
      active: false,
      component: <div></div>
    },
    {
      id: uuid(),
      name: 'Resident Responsibilities',
      active: false,
      component: <div></div>
    },
    {
      id: uuid(),
      name: 'Mattress Protectors',
      active: false,
      component: <div></div>
    }
  ]);

  const handleNavigationChange = key => {
    setNavOptions(prevNavOptions => {
      const newOptions = prevNavOptions.map(option => {
        if (option.id === key) setSelectedForm(option.component);
        return {
          id: option.id,
          name: option.name,
          active: option.id === key ? true : false,
          component: option.component
        };
      });
      return newOptions;
    });
  };

  useEffect(() => {
    if (!loading && !authUser) router.push('/dorms');
  }, [loading, authUser, router]);

  return (
    <DefaultLayout>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="In-Processing Done Easy"
        heroSubText="Fill out the forms so we know you're coming."
      />
      <Subtitle>Start Inprocessing</Subtitle>
      <Content className={`${classes.flex} ${classes.transparent}`}>
        <ProcessingNavigation
          navigationLinks={navOptions}
          onChangeForm={handleNavigationChange}
        />
        {selectedForm}
      </Content>
    </DefaultLayout>
  );
};

export default Processing;
