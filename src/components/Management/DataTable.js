import { useState, useEffect } from 'react';
import { Spinner, Icon, Input } from '../UI';
import classes from './DataTable.module.css';

const DataTable = ({
  headers,
  data,
  loading,
  preview,
  pagination,
  search,
  searchPlaceholder = 'Search',
  filterableColumns
}) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / rowsPerPage)
  );
  const [filteredData, setFilteredData] = useState(data);

  const filter = (data, query) =>
    data.filter(item => {
      let found = false;
      filterableColumns.forEach(column => {
        if (item[column]?.props?.href) {
          console.log(item[column].props.children);
          if (
            item[column].props.children
              .toLowerCase()
              .includes(query.toLowerCase())
          )
            return (found = true);
          return false;
        }

        if (
          String(item[column])?.toLowerCase()?.includes(query.toLowerCase())
        ) {
          return (found = true);
        }
        return false;
      });
      return found;
    });

  const handleQueryChange = event => {
    setQuery(event.target.value);
    setPage(1);
    if (!event.target.value) {
      setFilteredData(data);
      setTotalPages(Math.ceil(data.length / rowsPerPage));
    } else {
      const newData = filter(data, event.target.value);
      setFilteredData(newData);
      setTotalPages(Math.ceil(newData.length / rowsPerPage));
    }
  };

  useEffect(() => {
    if (query) {
      const newData = filter(data, query);
      setFilteredData(newData);
      setTotalPages(Math.ceil(newData.length / rowsPerPage));
    } else {
      setFilteredData(data);
      setTotalPages(Math.ceil(data.length / rowsPerPage));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {search && (
        <div className={classes.search}>
          <Input
            type="text"
            name="search"
            placeholder={searchPlaceholder}
            onChange={handleQueryChange}
            search
          />
        </div>
      )}
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr className={classes.tr}>
            {headers?.map(header => (
              <th key={header.key} className={classes.th}>
                {header.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {loading ? (
            <tr>
              <td colSpan={headers.length} className={classes.loading}>
                <Spinner />
              </td>
            </tr>
          ) : !filteredData.length ? (
            <tr>
              <td colSpan={headers.length} className={classes.empty}>
                No data to display
              </td>
            </tr>
          ) : preview ? (
            filteredData.slice(0, 5)?.map(item => (
              <tr key={item.id} className={classes.tr}>
                {headers.map(header => (
                  <td key={header.key + item.id} className={classes.td}>
                    {item[header.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : pagination ? (
            filteredData
              ?.slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
              ?.map(item => (
                <tr key={item.id} className={classes.tr}>
                  {headers.map(header => (
                    <td key={header.key + item.id} className={classes.td}>
                      {item[header.key]}
                    </td>
                  ))}
                </tr>
              ))
          ) : (
            filteredData?.map(item => (
              <tr key={item.id} className={classes.tr}>
                {headers.map(header => (
                  <td key={header.key + item.id} className={classes.td}>
                    {item[header.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && (
        <div className={classes.pagination}>
          {Array(totalPages)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={`${classes.page} ${
                  page === index + 1 ? classes.active : ''
                }`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default DataTable;
