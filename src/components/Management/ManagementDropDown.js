import React, { useState } from 'react';
import Link from 'next/link';

import classes from './ManagementDropDown.module.css';

const ManagementDropDown = ({ mainLink }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleShowDropDown = () => {
    setShowDropDown(prevState => !prevState);
  };
  return (
    <>
      <div className={classes['dropdown-title']}>
        <img src={mainLink.img} alt="link icon" className={classes.icon} />
        <Link href={mainLink.href}>
          <a className={classes['title-link']}>{mainLink.title}</a>
        </Link>
        {showDropDown && mainLink.dropdown && (
          <img
            onClick={handleShowDropDown}
            src="/images/arrow-up.svg"
            alt="collapse drop down button"
            className={classes.arrow}
          />
        )}
        {!showDropDown && mainLink.dropdown && (
          <img
            onClick={handleShowDropDown}
            src="/images/arrow-down.svg"
            alt="drop down button"
            className={classes.arrow}
          />
        )}
      </div>
      {showDropDown && (
        <div className={classes['dropdown-content']}>
          {mainLink.dropdown?.map(link => (
            <div key={link.id} className={classes.link}>
              <Link href={link.href}>
                <a className={classes['dropdown-link']}>{link.title}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ManagementDropDown;
