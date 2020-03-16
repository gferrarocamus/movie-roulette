import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Pagination } from 'antd';
import ListItem from '../ListItem';
import './List.css';

const cardStyle = {
  backgroundColor: 'inherit',
  border: 'none',
};

const gridStyle = {
  width: 'auto',
  textAlign: 'center',
  position: 'relative',
  // padding: '0',
};

const gridBodyStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
};

const List = ({ details, list, listKey, setList, width, ...rest }) => {
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedList, setPaginatedList] = useState(list);

  const onChange = (page) => setCurrentPage(page);

  useEffect(() => {
    if (width > 1098) {
      setResultsPerPage(30); // 5-6 posters per row
    } else if (width > 698) {
      setResultsPerPage(24); // 3-4 posters per row
    } else {
      setResultsPerPage(10); // 1-2 posters per row
    }
  }, [width]);

  useEffect(() => {
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    setPaginatedList(list.slice(start, end));
  }, [resultsPerPage, currentPage, list]);

  return (
    list.length > 0 && (
      <div className="list">
        <h2>
          {details[0]}
          <Icon
            style={{ fontSize: '0.8em', lineHeight: '1em', marginLeft: '5px' }}
            type={details[1]}
          />
        </h2>
        <Card bodyStyle={gridBodyStyle} style={cardStyle} className="list-card">
          {paginatedList.map((movie) => (
            <Card.Grid key={movie.id} style={gridStyle}>
              <ListItem
                movie={movie}
                list={paginatedList}
                listKey={listKey}
                setList={setList}
                width={width}
                {...rest}
              />
            </Card.Grid>
          ))}
        </Card>
        <div className="pagination-container">
          <Pagination
            defaultCurrent={1}
            hideOnSinglePage
            onChange={onChange}
            pageSize={resultsPerPage}
            style={{ marginTop: '1em' }}
            total={list.length}
          />
        </div>
      </div>
    )
  );
};

List.propTypes = {
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  listKey: PropTypes.string.isRequired,
  setList: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

List.defaultProps = {};

export default List;
