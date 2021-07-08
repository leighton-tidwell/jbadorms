import React from "react";

import Header from "../../components/UI/Header";
import ImageBanner from "../../components/UI/ImageBanner";
import Subtitle from "../../components/UI/Subtitle";
import Content from "../../components/UI/Content";
import AppointmentScheduler from "../../components/Dorms/Appointments/AppointmentScheduler";
import Footer from "../../components/UI/Footer";

import BannerBackgroundImage from "../../images/appointment_banner.png";

const Appointments = () => {
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
      <ImageBanner
        backgroundImage={BannerBackgroundImage}
        heroText="Make an Appointment"
        heroSubText="Get the help you need, soon."
      />
      <Subtitle>Talk to an ADL</Subtitle>
      <Content>
        <AppointmentScheduler />
      </Content>
      <Footer logoTitle={LOGO_TEXT} logoSubTitle={"Joint Base Andrews"} />
    </>
  );
};

export default Appointments;
