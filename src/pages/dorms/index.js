import React from 'react';

import DefaultLayout from '../../layouts/dorms/default';
import Carousel from '../../components/UI/Carousel';
import QuickLinks from '../../components/Dorms/QuickLinks/QuickLinks';
import Contact from '../../components/Dorms/Contact/Contact';
import MapSection from '../../components/Dorms/Map/MapSection';
import ContentBanner from '../../components/Dorms/ContentBanner/ContentBanner';
import AdditionalInformation from '../../components/Dorms/AdditionalInformation/AdditionalInformation';

const HomePage = props => {
  return (
    <DefaultLayout>
      <Carousel />
      <QuickLinks />
      <Contact />
      <MapSection />
      <ContentBanner />
      <AdditionalInformation />
    </DefaultLayout>
  );
};

export default HomePage;
