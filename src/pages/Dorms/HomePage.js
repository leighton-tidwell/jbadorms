import React from "react";

import Header from "../../components/UI/Header";
import Carousel from "../../components/UI/Carousel";
import QuickLinks from "../../components/Dorms/QuickLinks";
import Contact from "../../components/Dorms/Contact";
import MapSection from "../../components/Dorms/MapSection";
import ContentBanner from "../../components/Dorms/ContentBanner";
import AdditionalInformation from "../../components/Dorms/AdditionalInformation";
import Footer from "../../components/UI/Footer";

const HomePage = () => {
  const LOGO_TEXT = "JBA Dorms";
  const navigationLinks = [
    {
      text: "Home",
      href: "/dorms",
    },
    {
      text: "Rooms",
      href: "/dorms/room",
    },
    {
      text: "Contact",
      href: "/dorms/contact",
    },
    {
      text: "Processing",
      href: "/dorms/processing",
    },
  ];

  return (
    <>
      <Header logo={LOGO_TEXT} links={navigationLinks} logoLink={"/dorms"} />
      <Carousel />
      <QuickLinks />
      <Contact />
      <MapSection />
      <ContentBanner />
      <AdditionalInformation />
      <Footer logoTitle={LOGO_TEXT} logoSubTitle={"Joint Base Andrews"} />
    </>
  );
};

export default HomePage;
