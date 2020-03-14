import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Card } from 'antd';
import Empty from '../Empty';
import ListItem from '../ListItem';
import { getList } from '../../services/lib';
import './Watchlist.css';

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

const Watchlist = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getList('watchlist'));
  }, []);

  return movies.length === 0 ? (
    <Empty description="No Movies Discovered (Yet)" content={null} />
  ) : (
    <div className="watchlist">
      <h2>Your Watchlist</h2>
      <Card bodyStyle={gridBodyStyle} style={cardStyle} className="watchlist-container">
        {movies.map((movie) => (
          <Card.Grid
            key={movie.id}
            style={gridStyle}
          >
            <ListItem movie={movie} {...props} />
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

Watchlist.propTypes = {};

Watchlist.defaultProps = {};

export default Watchlist;
