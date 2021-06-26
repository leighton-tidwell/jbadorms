import React from "react";

import classes from "./QuickLinks.module.css";
import ContentWrapper from "../UI/ContentWrapper";
import LinkElement from "./LinkElement";

const QuickLinks = () => {
  const links = [
    {
      name: "Frequently Asked Questions",
      href: "/dorms/faq",
      image: "/images/quick_links_one.png",
    },
    {
      name: "Dorm Guide",
      href: "/dorms/dormguide",
      image: "/images/quick_links_two.png",
    },
  ];
  return (
    <ContentWrapper>
      <div className={classes.container}>
        <div className={classes.title}>Providing for our Airmen</div>
        <div className={classes["links-container"]}>
          {links.map((link, i) => (
            <LinkElement key={i} href={link.href} bgImage={link.image}>
              {link.name}
            </LinkElement>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default QuickLinks;
