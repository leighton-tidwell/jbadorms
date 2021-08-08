import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';

import { useAuth } from '../../context/AuthUserProvider';

const navigationLinksAuth = [
  {
    id: uuid(),
    text: 'home',
    href: '/dorms'
  },
  {
    id: uuid(),
    text: 'rooms',
    href: '/dorms/rooms'
  },
  {
    id: uuid(),
    text: 'appointments',
    href: '/dorms/appointments'
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
  },
  {
    id: uuid(),
    text: 'sign out',
    href: '/signout'
  }
];

const navigationLinksUnAuth = [
  {
    id: uuid(),
    text: 'home',
    href: '/dorms'
  },
  {
    id: uuid(),
    text: 'rooms',
    href: '/dorms/rooms'
  },
  {
    id: uuid(),
    text: 'login',
    href: '/login'
  }
];

const DefaultLayout = ({ children }) => {
  const [navLinks, setNavLinks] = useState(navigationLinksUnAuth);
  const { authUser, loading } = useAuth();

  const logo = 'JBA Dorms';

  useEffect(() => {
    if (!loading && authUser) setNavLinks(navigationLinksAuth);
  }, [loading, authUser]);

  return (
    <>
      <Header logo={logo} links={navLinks} logoLink={'/dorms'} />
      {children}
      <Footer logoTitle={logo} logoSubTitle={'Joint Base Andrews'} />
    </>
  );
};

export default DefaultLayout;
