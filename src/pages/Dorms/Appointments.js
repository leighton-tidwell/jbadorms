import React from "react";

import Header from "../../components/UI/Header";
import ImageBanner from "../../components/UI/ImageBanner";
import Subtitle from "../../components/UI/Subtitle";
import Content from "../../components/UI/Content";
import AppointmentScheduler from "../../components/Dorms/Appointments/AppointmentScheduler";
import Footer from "../../components/UI/Footer";

import BannerBackgroundImage from "../../images/appointment_banner.png";

const Appointments = (props) => {
  return (
    <>
      <Header
        logo={props.logo}
        links={props.navigationLinks}
        logoLink={"/dorms"}
      />
      <ImageBanner
        backgroundImage={BannerBackgroundImage}
        heroText="Make an Appointment"
        heroSubText="Get the help you need, soon."
      />
      <Subtitle>Talk to an ADL</Subtitle>
      <Content>
        <AppointmentScheduler />
      </Content>
      <Footer logoTitle={props.logo} logoSubTitle={"Joint Base Andrews"} />
    </>
  );
};

export default Appointments;
