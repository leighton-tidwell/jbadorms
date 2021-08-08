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
      href: '/dorms/processing'
    },
    {
      title: 'work orders',
      href: '/dorms/work-orders'
    },
    {
      title: 'rooms',
      href: '/dorms/rooms'
    },
    {
      title: 'jba map',
      href: '/dorms'
    },
    {
      title: 'air force portal',
      href: '/dorms'
    },
    {
      title: 'contact us',
      href: '/dorms'
    },
    {
      title: 'other link',
      href: '/dorms'
    },
    {
      title: 'dorm rooms',
      href: '/dorms'
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
