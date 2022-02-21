import React, { useEffect, useState, useLayoutEffect } from 'react';
import uuid from 'react-uuid';
import { useRouter } from 'next/router';

import classes from './ManagementNavigation.module.css';
import ManagementDropDown from './ManagementDropDown';

const ManagementNavigation = ({ showNav, setShowNav }) => {
  const router = useRouter();
  const [show, setShow] = useState(true);

  const isActive = href => {
    return router.pathname === href;
  };

  const managementNav = [
    {
      id: 'dorms',
      href: '/management/dorms',
      title: 'Dorms',
      img: '/images/management/dorms_active.svg',
      dropdown: [
        {
          id: 'dorms-overview',
          href: '/management/dorms',
          title: 'Overview',
          active: isActive('/management/dorms')
        },
        {
          id: 'dorms-buildings',
          href: '/management/dorms/buildings',
          title: 'Buildings',
          active: isActive('/management/dorms/buildings')
        },
        {
          id: 'dorms-residents',
          href: '/management/dorms/residents',
          title: 'Residents',
          active: isActive('/management/dorms/residents')
        },
        {
          id: 'dorms-staff',
          href: '/management/dorms/staff',
          title: 'Staff',
          active: isActive('/management/dorms/staff')
        },
        {
          id: 'dorms-site-settings',
          href: '/management/dorms/site-settings',
          title: 'Site Settings',
          active: isActive('/management/dorms/site-settings')
        }
      ]
    },
    {
      id: 'housing',
      href: '/management/housing',
      title: 'Housing'
    }
  ];

  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    setShow((showNav === true && size < 1200) || size >= 1200);
  }, [showNav, size]);

  return (
    show && (
      <div className={classes.nav}>
        <ul className={classes.ul}>
          {managementNav.map(menuLink => (
            <ManagementDropDown key={menuLink.id} mainLink={menuLink} />
          ))}
        </ul>
      </div>
    )
  );
};

export default ManagementNavigation;
