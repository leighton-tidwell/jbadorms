import React from 'react';
import uuid from 'react-uuid';
import { useRouter } from 'next/router';

import classes from './ManagementNavigation.module.css';
import ManagementDropDown from './ManagementDropDown';

const ManagementNavigation = () => {
  const router = useRouter();

  const isActive = href => {
    return router.pathname === href;
  };

  const managementNav = [
    {
      id: uuid(),
      href: '/management/dorms',
      title: 'Dorms',
      img: '/images/management/dorms_active.svg',
      dropdown: [
        {
          id: uuid(),
          href: '/management/dorms',
          title: 'Overview',
          active: isActive('/management/dorms')
        },
        {
          id: uuid(),
          href: '/management/dorms/buildings',
          title: 'Buildings',
          active: isActive('/management/dorms/buildings')
        },
        {
          id: uuid(),
          href: '/management/dorms/resident',
          title: 'Residents',
          active: isActive('/management/dorms/resident')
        },
        {
          id: uuid(),
          href: '/management/dorms/site-settings',
          title: 'Site Settings',
          active: isActive('/management/dorms/site-settings')
        }
      ]
    },
    {
      id: uuid(),
      href: '/management/housing',
      title: 'Housing',
      img: '/images/management/housing_active.svg'
    }
  ];

  return (
    <div className={classes.nav}>
      <ul className={classes.ul}>
        {managementNav.map(menuLink => (
          <ManagementDropDown key={menuLink.id} mainLink={menuLink} />
        ))}
      </ul>
    </div>
  );
};

export default ManagementNavigation;
