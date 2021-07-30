import React from "react";

import Header from "../../components/UI/Header";
import Carousel from "../../components/UI/Carousel";
import QuickLinks from "../../components/Dorms/QuickLinks/QuickLinks";
import Contact from "../../components/Dorms/Contact/Contact";
import MapSection from "../../components/Dorms/Map/MapSection";
import ContentBanner from "../../components/Dorms/ContentBanner/ContentBanner";
import AdditionalInformation from "../../components/Dorms/AdditionalInformation/AdditionalInformation";
import Footer from "../../components/UI/Footer";

const HomePage = (props) => {
  return (
    <>
      <Header
        logo={props.logo}
        links={props.navigationLinks}
        logoLink={"/dorms"}
      />
      <Carousel />
      <QuickLinks />
      <Contact />
      <MapSection />
      <ContentBanner />
      <AdditionalInformation />
      <Footer logoTitle={props.logo} logoSubTitle={"Joint Base Andrews"} />
    </>
  );
};

export default HomePage;
