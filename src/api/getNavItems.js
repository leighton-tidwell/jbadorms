import uuid from 'react-uuid';

const getNavItems = authenticated => {
  const navigationLinksAuth = [
    {
      id: uuid(),
      text: 'home',
      href: '/dorms'
    },
    {
      id: uuid(),
      text: 'work orders',
      href: '/dorms/work-orders'
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
          text: 'Assignment Data Form',
          href: '/dorms/processing/uh-assignment-data-form'
        },
        {
          id: uuid(),
          text: 'Conditions Checklist',
          href: '/dorms/uh-conditions-checklist'
        },
        {
          id: uuid(),
          text: 'Resident Responsibilities',
          href: '/dorms/processing/resident-responsibilities'
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
          text: 'Briefing',
          href: '/dorms/bay-orderly-briefing'
        },
        {
          id: uuid(),
          text: 'Daily Checklist',
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
      text: 'bay orderly',
      href: '/dorms/bay-orderly',
      dropdown: [
        {
          id: uuid(),
          text: 'Briefing',
          href: '/dorms/bay-orderly-briefing'
        },
        {
          id: uuid(),
          text: 'Daily Checklist',
          href: '/dorms/bay-orderly-daily-checklist'
        }
      ]
    },
    {
      id: uuid(),
      text: 'login',
      href: '/login'
    }
  ];

  if (authenticated) return navigationLinksAuth;
  return navigationLinksUnAuth;
};

export default getNavItems;
