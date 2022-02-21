import React, { useState, useEffect } from 'react';

import ManagementHeader from '../../components/Management/ManagementHeader';
import ManagementContainer from '../../components/Management/ManagementContainer';

const ManagementLayout = ({ userName, children }) => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (showNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showNav]);

  return (
    <>
      <ManagementHeader
        userName={userName}
        showNav={showNav}
        setShowNav={setShowNav}
      />
      <ManagementContainer showNav={showNav} setShowNav={setShowNav}>
        {children}
      </ManagementContainer>
    </>
  );
};

export default ManagementLayout;
