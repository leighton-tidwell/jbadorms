import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

import classes from './ResidentsTable.module.css';
import Link from 'next/link';

const ResidentsTable = ({ image, title, data, type, showMore }) => {
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

  const getTypeLink = item => {
    if (type === 'building')
      return `/management/dorms/buildings/${item.building}`;
    if (type === 'resident' || type === 'dormstaff')
      return `/management/dorms/resident/${item.email}`;
  };

  const getViewAllLink = () => {
    if (type === 'building') return '/management/dorms/buildings';
    if (type === 'resident') return '/management/dorms/resident';
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
                  {Object.keys(user).map((attribute, i) => (
                    <td key={uuid()} className={classes.cell}>
                      {i === 0 && type ? (
                        <Link href={`${getTypeLink(user)}`}>
                          <a className={classes.link}>{user[attribute]}</a>
                        </Link>
                      ) : (
                        user[attribute]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <div className={classes.more}>
              <Link href={`${getViewAllLink()}`}>
                <a className={classes['more-link']}>
                  View all <div className={classes['more-image']}></div>
                </a>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className={classes.null}>No Data</div>
      )}
    </div>
  );
};

export default ResidentsTable;
