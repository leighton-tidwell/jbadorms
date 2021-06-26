import React from "react";

import Header from "../../components/UI/Header";
import Carousel from "../../components/UI/Carousel";

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
    </>
  );
};

export default HomePage;
