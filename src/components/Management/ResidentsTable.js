import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

import classes from './ResidentsTable.module.css';
import Link from 'next/link';

const ResidentsTable = ({ image, title, data }) => {
  const [headers, setHeaders] = useState([]);

  const processHeaders = data => {
    if (!data) return;
    const headersArray = data.reduce((list, o) => {
      return Object.keys(o).reduce((a, k) => {
        if (a.indexOf(k) == -1) a.push(k);
        return a;
      }, list);
    }, []);
    setHeaders(headersArray);
  };

  useEffect(() => {
    processHeaders(data);
  }, [data]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <img className={classes.image} src={image} alt="table icon" />
        {title}
      </div>
      {headers.length !== 0 ? (
        <>
          <table className={classes.table}>
            <thead className={classes.head}>
              <tr>
                {headers.map(header => (
                  <th key={uuid()} className={classes.header}>
                    {header.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={classes.body}>
              {data.map(user => (
                <tr key={uuid()} className={classes.row}>
                  {Object.keys(user).map(attribute => (
                    <td key={uuid()} className={classes.cell}>
                      {user[attribute]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={classes.more}>
            <Link href="/">
              <a className={classes['more-link']}>
                View all <div className={classes['more-image']}></div>
              </a>
            </Link>
          </div>
        </>
      ) : (
        <div className={classes.null}>No Data</div>
      )}
    </div>
  );
};

export default ResidentsTable;
