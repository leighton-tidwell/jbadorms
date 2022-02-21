import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './ManagementDropDown.module.css';

const ManagementDropDown = ({ mainLink }) => {
  const router = useRouter();
  const hasActiveLink = () => {
    if (mainLink.dropdown) {
      return mainLink.dropdown.some(link => link.active);
    }
    return false;
  };

  const isInSimilarPath = () => {
    if (mainLink.dropdown) {
      return mainLink.dropdown.some(link =>
        router.pathname.includes(link.href)
      );
    }
    return false;
  };

  const [showDropDown, setShowDropDown] = useState(
    hasActiveLink() || isInSimilarPath() ? true : false
  );

  const handleShowDropDown = () => {
    mainLink.dropdown && setShowDropDown(prevState => !prevState);
  };

  return (
    <>
      <div onClick={handleShowDropDown} className={classes['dropdown-title']}>
        <a className={classes['title-link']}>{mainLink.title}</a>
        {mainLink.dropdown && (
          <img
            src={
              showDropDown ? '/images/arrow-up.svg' : '/images/arrow-down.svg'
            }
            alt="drop down button"
            className={classes.arrow}
          />
        )}
      </div>
      <div
        style={{
          height: showDropDown ? `${mainLink.dropdown.length * 50}px` : 0
        }}
        className={`${classes['dropdown-content']}`}
      >
        {mainLink.dropdown?.map(link => (
          <Link href={link.href} key={link.id} passHref>
            <div className={`${classes.link} ${link.active && classes.active}`}>
              <a className={classes['dropdown-link']}>{link.title}</a>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ManagementDropDown;
