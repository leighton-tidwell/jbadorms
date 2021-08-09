import React from 'react';

import ManagementHeader from '../../components/Management/ManagementHeader';
import ManagementContainer from '../../components/Management/ManagementContainer';

const ManagementLayout = ({ userName, children }) => {
  return (
    <>
      <ManagementHeader userName={userName} />
      <ManagementContainer>{children}</ManagementContainer>
    </>
  );
};

export default ManagementLayout;
