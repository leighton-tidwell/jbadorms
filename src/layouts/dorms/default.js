import React from 'react';

import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';

const DefaultLayout = ({ children, navLinks }) => {
  const logo = 'JBA Dorms';

  return (
    <>
      <Header logo={logo} links={navLinks} logoLink={'/dorms'} />
      {children}
      <Footer logoTitle={logo} logoSubTitle={'Joint Base Andrews'} />
    </>
  );
};

export default DefaultLayout;
