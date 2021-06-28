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
      text: "home",
      href: "/dorms",
    },
    {
      text: "appointments",
      href: "/dorms/appointments",
    },
    {
      text: "inspection",
      href: "/dorms/inspection",
    },
    {
      text: "processing",
      href: "/dorms/processing",
      dropdown: [
        {
          text: "UH Assignment Data Form",
          href: "/dorms/uh-assignment-data-form",
        },
        {
          text: "UH Conditions Checklist",
          href: "/dorms/uh-conditions-checklist",
        },
        {
          text: "Resident Responsibilities",
          href: "/dorms/resident-responsibilities",
        },
        {
          text: "Mandatory Use of Mattress Protectors",
          href: "/dorms/mandatory-use-of-mattress-protectors",
        },
      ],
    },
    {
      text: "bay orderly",
      href: "/dorms/bay-orderly",
      dropdown: [
        {
          text: "Bay Orderly Briefing",
          href: "/dorms/bay-orderly-briefing",
        },
        {
          text: "Bay Orderly Daily Checklist",
          href: "/dorms/bay-orderly-daily-checklist",
        },
      ],
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
