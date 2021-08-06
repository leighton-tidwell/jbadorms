import React from 'react';
import uuid from 'react-uuid';

import Header from '../../../components/UI/Header';
import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import AppointmentScheduler from '../../../components/Dorms/Appointments/AppointmentScheduler';
import Footer from '../../../components/UI/Footer';

const Appointments = props => {
  const logo = 'JBA Dorms';
  const bannerBackgroundImage = '/images/appointment_banner.png';
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
  return (
    <>
      <Header logo={logo} links={navigationLinks.dorms} logoLink={'/dorms'} />
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="Make an Appointment"
        heroSubText="Get the help you need, soon."
      />
      <Subtitle>Talk to an ADL</Subtitle>
      <Content>
        <AppointmentScheduler />
      </Content>
      <Footer logoTitle={logo} logoSubTitle={'Joint Base Andrews'} />
    </>
  );
};

export default Appointments;
