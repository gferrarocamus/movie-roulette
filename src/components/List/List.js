import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import Empty from '../Empty';
import ListItem from '../ListItem';
import { getList, setToStorage } from '../../services/lib';
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

const List = ({ details, listKey, ...rest }) => {
  const [list, setList] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setList(getList(listKey));
  }, [listKey]);

  useEffect(() => {
    if (updated) {
      setToStorage(listKey, list);
    }
  }, [list, listKey, updated]);

  return list.length === 0 ? (
    <Empty description="No Movies Discovered (Yet)" content={null} />
  ) : (
    <div className="list">
      <h2>
        {details[0]}
        <Icon
          style={{ fontSize: '0.8em', lineHeight: '1em', marginLeft: '5px' }}
          type={details[1]}
        />
      </h2>
      <Card bodyStyle={gridBodyStyle} style={cardStyle} className="list-card">
        {list.map((movie) => (
          <Card.Grid key={movie.id} style={gridStyle}>
            <ListItem movie={movie} list={list} setList={setList} setUpdated={setUpdated} {...rest} />
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

List.propTypes = {
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
  listKey: PropTypes.string.isRequired,
};

List.defaultProps = {};

export default List;
