import React, { useState } from "react";
import uuid from "react-uuid";

import Header from "../../components/UI/Header";
import ImageBanner from "../../components/UI/ImageBanner";
import Subtitle from "../../components/UI/Subtitle";
import Content from "../../components/UI/Content";
import Footer from "../../components/UI/Footer";

import BannerBackgroundImage from "../../images/processing_banner.png";
import ProcessingNavigation from "../../components/Dorms/ProcessingNavigation/ProcessingNavigation";
import IncomingAirmenChecklist from "../../components/Dorms/ProcessingForms/IncomingAirmenChecklist";

import classes from "./Processing.module.css";

const Processing = (props) => {
  const [selectedForm, setSelectedForm] = useState(<IncomingAirmenChecklist />);
  const [navOptions, setNavOptions] = useState([
    {
      id: uuid(),
      name: "Incoming Airmen",
      active: true,
      component: <IncomingAirmenChecklist />,
    },
    {
      id: uuid(),
      name: "Assignment Data",
      active: false,
      component: <div></div>,
    },
    {
      id: uuid(),
      name: "Conditions Checklist",
      active: false,
      component: <div></div>,
    },
    {
      id: uuid(),
      name: "Resident Responsibilities",
      active: false,
      component: <div></div>,
    },
    {
      id: uuid(),
      name: "Mattress Protectors",
      active: false,
      component: <div></div>,
    },
  ]);

  const handleNavigationChange = (key) => {
    setNavOptions((prevNavOptions) => {
      const newOptions = prevNavOptions.map((option) => {
        if (option.id === key) setSelectedForm(option.component);
        return {
          id: option.id,
          name: option.name,
          active: option.id === key ? true : false,
          component: option.component,
        };
      });
      return newOptions;
    });
  };

  return (
    <>
      <Header
        logo={props.logo}
        links={props.navigationLinks}
        logoLink={"/dorms"}
      />
      <ImageBanner
        backgroundImage={BannerBackgroundImage}
        heroText="In-Processing Done Easy"
        heroSubText="Fill out the forms so we know you're coming."
      />
      <Subtitle>Start Inprocessing</Subtitle>
      <Content className={`${classes.flex} ${classes.transparent}`}>
        <ProcessingNavigation
          navigationLinks={navOptions}
          onChangeForm={handleNavigationChange}
        />
        {selectedForm}
      </Content>
      <Footer logoTitle={props.logo} logoSubTitle={"Joint Base Andrews"} />
    </>
  );
};

export default Processing;
