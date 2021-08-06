import React from 'react';
import uuid from 'react-uuid';

import Header from '../../components/UI/Header';
import Carousel from '../../components/UI/Carousel';
import QuickLinks from '../../components/Dorms/QuickLinks/QuickLinks';
import Contact from '../../components/Dorms/Contact/Contact';
import MapSection from '../../components/Dorms/Map/MapSection';
import ContentBanner from '../../components/Dorms/ContentBanner/ContentBanner';
import AdditionalInformation from '../../components/Dorms/AdditionalInformation/AdditionalInformation';
import Footer from '../../components/UI/Footer';

const HomePage = props => {
  const logo = 'JBA Dorms';
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
      <Carousel />
      <QuickLinks />
      <Contact />
      <MapSection />
      <ContentBanner />
      <AdditionalInformation />
      <Footer logoTitle={logo} logoSubTitle={'Joint Base Andrews'} />
    </>
  );
};

export default HomePage;
