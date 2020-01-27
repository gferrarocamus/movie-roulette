import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { getResource } from '../services/api';
import '../styles/homepage.css';

const Homepage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const resource = getResource('initial', { sort_by: 'vote_average.desc' });

    if (resource && JSON.stringify(resource) !== '{}') {
      setMovies(resource.data);
    }
  }, []);

  return (
    <div className="homepage" style={{}}>
      MovieRoulette
      {console.log(movies)}
    </div>
  );
};

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
