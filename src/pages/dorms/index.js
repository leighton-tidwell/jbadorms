import React from 'react';
import Amplify, { withSSRContext } from 'aws-amplify';
import getNavItems from '../../api/getNavItems';
import config from '../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import DefaultLayout from '../../layouts/dorms/default';
import Carousel from '../../components/UI/Carousel';
import QuickLinks from '../../components/Dorms/QuickLinks/QuickLinks';
import Contact from '../../components/Dorms/Contact/Contact';
import MapSection from '../../components/Dorms/Map/MapSection';
import ContentBanner from '../../components/Dorms/ContentBanner/ContentBanner';
import AdditionalInformation from '../../components/Dorms/AdditionalInformation/AdditionalInformation';

const HomePage = ({ navLinks }) => {
  return (
    <DefaultLayout navLinks={navLinks}>
      <Carousel />
      <QuickLinks />
      <Contact />
      <MapSection />
      <ContentBanner />
      <AdditionalInformation />
    </DefaultLayout>
  );
};

export const getServerSideProps = async context => {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        authenticated: true,
        username: user.username,
        navLinks: getNavItems(true)
      }
    };
  } catch (error) {
    return {
      props: {
        authenticated: false,
        navLinks: getNavItems(false)
      }
    };
  }
};

export default HomePage;
