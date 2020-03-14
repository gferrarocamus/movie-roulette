import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import Empty from '../Empty';
import { getList } from '../../services/lib';

const Watchlist = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getList('watchlist'));
  }, []);

  return movies.length === 0 ? (
    <Empty description="No Movies Discovered (Yet)" content={null} />
  ) : (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          {console.log(JSON.stringify(movies))}
          {movie.title}
        </div>
      ))}
    </div>
  );
};

Watchlist.propTypes = {};

Watchlist.defaultProps = {};

export default Watchlist;
