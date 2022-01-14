import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classes from './MobileDropDownLink.module.css';

const MobileDropDownLink = ({ links }) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const arrowRightImage = '/images/arrow-right-nav.svg';
  const arrowDownImage = '/images/arrow-down.svg';
  const router = useRouter();
  const isActive = href => href === router.pathname;

  const handleDropDown = () => {
    setIsDropDown(previousState => !previousState);
  };

  useEffect(() => {
    if (
      links.dropdown.filter(link => link.href === router.pathname).length !== 0
    )
      setIsDropDown(true);
  }, [links]);

  return (
    <div className={classes.container}>
      <div onClick={handleDropDown} className={classes.title}>
        {links.text}
        {!isDropDown && (
          <img
            src={arrowRightImage}
            alt="drop down button"
            className={classes.image}
          />
        )}
        {isDropDown && (
          <img
            src={arrowDownImage}
            alt="minimize drop down button"
            className={classes.image}
          />
        )}
      </div>
      {isDropDown && (
        <div className={classes.dropdown}>
          {links.dropdown.map(link => (
            <Link key={link.id} href={link.href}>
              <a
                className={`${classes.link} ${
                  isActive(link.href) && classes.active
                }`}
              >
                {link.text}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileDropDownLink;
