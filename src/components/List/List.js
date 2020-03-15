import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Empty from '../Empty';
import ListItem from '../ListItem';
import { getList } from '../../services/lib';
import './List.css';

const cardStyle = {
  backgroundColor: 'inherit',
  border: 'none',
};

const gridStyle = {
  width: 'auto',
  textAlign: 'center',
  position: 'relative',
};

const gridBodyStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
};

const List = ({ key, title, ...rest }) => {
  const [list, setList] = useState([]);

  const handleClick = () => {

  };

  useEffect(() => {
    setList(getList(key));
  }, [key]);

  return list.length === 0 ? (
    <Empty description="No Movies Discovered (Yet)" content={null} />
  ) : (
    <div className="list">
      <h2>{title}</h2>
      <Card bodyStyle={gridBodyStyle} style={cardStyle} className="list-card">
        {list.map((movie) => (
          <Card.Grid
            key={movie.id}
            style={gridStyle}
          >
            <ListItem movie={movie} {...rest} />
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

List.propTypes = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

List.defaultProps = {};

export default List;
