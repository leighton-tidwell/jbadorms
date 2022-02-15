import React from 'react';
import Link from 'next/link';

import classes from './Footer.module.css';
import ContentWrapper from './ContentWrapper';

const Footer = props => {
  const navigationLinks = [
    {
      title: 'Dorm Guide',
      href: '/dorms'
    },
    {
      title: 'in processing',
      href: '/dorms/processing/uh-assignment-data-form'
    },
    {
      title: 'FAQs',
      href: '/dorms/faq'
    },
    {
      title: 'management portal',
      href: '/management/dorms'
    },
    {
      title: 'jba map',
      href: '/images/jbamap.jpg'
    },
    {
      title: 'air force portal',
      href: 'https://www.my.af.mil/'
    }
  ];
  return (
    <div className={classes.background}>
      <ContentWrapper className={classes.mobile}>
        <div className={classes['logo-container']}>
          <h2>{props.logoTitle}</h2>
          <h3>{props.logoSubTitle}</h3>
        </div>
        <div className={classes['link-navigation']}>
          {navigationLinks.map((link, i) => (
            <Link key={i} href={link.href}>
              <a className={classes['link-item']}>{link.title}</a>
            </Link>
          ))}
        </div>
        <div className={classes['credited-to']}>
          <span className={classes.credit}>
            Created By:
            <br />
            <a href="https://github.com/leighton-tidwell">@leighton-tidwell</a>
          </span>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Footer;
