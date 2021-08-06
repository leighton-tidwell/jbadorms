import React, { useState } from 'react';
import uuid from 'react-uuid';

import Header from '../../../components/UI/Header';
import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import Footer from '../../../components/UI/Footer';

import ProcessingNavigation from '../../../components/Dorms/ProcessingNavigation/ProcessingNavigation';
import IncomingAirmenChecklist from '../../../components/Dorms/ProcessingForms/IncomingAirmenChecklist';

import classes from './index.module.css';

const Processing = props => {
  const logo = 'JBA Dorms';
  const bannerBackgroundImage = '/images/processing_banner.png';
  const navigationLinks = {
    dorms: [
      {
        id: uuid(),
        text: 'home',
        href: '/dorms'
      },
      {
        id: uuid(),
        text: 'appointments',
        href: '/dorms/appointments'
      },
      {
        id: uuid(),
        text: 'inspection',
        href: '/dorms/inspection'
      },
      {
        id: uuid(),
        text: 'processing',
        href: '/dorms/processing',
        dropdown: [
          {
            id: uuid(),
            text: 'UH Assignment Data Form',
            href: '/dorms/uh-assignment-data-form'
          },
          {
            id: uuid(),
            text: 'UH Conditions Checklist',
            href: '/dorms/uh-conditions-checklist'
          },
          {
            id: uuid(),
            text: 'Resident Responsibilities',
            href: '/dorms/resident-responsibilities'
          },
          {
            id: uuid(),
            text: 'Mandatory Use of Mattress Protectors',
            href: '/dorms/mandatory-use-of-mattress-protectors'
          }
        ]
      },
      {
        id: uuid(),
        text: 'bay orderly',
        href: '/dorms/bay-orderly',
        dropdown: [
          {
            id: uuid(),
            text: 'Bay Orderly Briefing',
            href: '/dorms/bay-orderly-briefing'
          },
          {
            id: uuid(),
            text: 'Bay Orderly Daily Checklist',
            href: '/dorms/bay-orderly-daily-checklist'
          }
        ]
      }
    ]
  };
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

  return (
    <>
      <Header logo={logo} links={navigationLinks.dorms} logoLink={'/dorms'} />
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
      <Footer logoTitle={logo} logoSubTitle={'Joint Base Andrews'} />
    </>
  );
};

export default Processing;
