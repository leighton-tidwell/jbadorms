import React from 'react';

import classes from './ProcessingLink.module.css';

const ProcessingLink = props => {
  const handleLinkClick = key => {
    props.onLinkClick(props.option.id);
  };

  return (
    <li
      key={props.option.id}
      onClick={handleLinkClick}
      className={`${classes.li} ${props.option.active ? classes.active : ''}`}
    >
      {props.option.name}
    </li>
  );
};

export default ProcessingLink;
