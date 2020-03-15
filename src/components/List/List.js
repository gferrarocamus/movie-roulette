import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
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

const List = ({ details, list, listKey, setList, ...rest }) => {

  return list.length > 0 && (
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
            <ListItem movie={movie} list={list} listKey={listKey} setList={setList} {...rest} />
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

List.propTypes = {
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  listKey: PropTypes.string.isRequired,
  setList: PropTypes.func.isRequired,
};

List.defaultProps = {};

export default List;
