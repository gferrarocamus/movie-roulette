import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import MovieTile from '../MovieTile/MovieTile';
import { getByDiscover, getInitialSelection, getInitial } from '../../services/api';
import { initialMovies, keys, buttons } from '../../data';
import './Homepage.css';

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [initial, setInitial] = useState([]);
  const [popular, setPopular] = useState([]);
  const [random, setRandom] = useState([]);

  const fetchedMovies = [
    initial,
    popular,
    random,
    [],
  ];

  useEffect(() => {
    if (localStorage.MovieRoulette__initial) {
      getInitial().then((response) => {
        setInitial(response);
        setMovies(getInitialSelection(response, buttons.length));
      });
    } else {
      setMovies(initialMovies);
      getInitial().then((response) => setInitial(response));
    }
  }, []);

  useEffect(() => {
    getByDiscover('popular').then((response) => setPopular(response));
  }, []);

  useEffect(() => {
    getByDiscover('random').then((response) => setRandom(response));
  }, []);

  return (
    <div className="homepage">
      {movies.map((movie, i) => (
        <MovieTile
          key={keys[i]}
          buttonKey={keys[i]}
          buttonData={buttons[i]}
          movie={movie}
          movies={fetchedMovies[i]}
        />
      ))}
    </div>
  );
};

// Homepage.propTypes = {};

// Homepage.defaultProps = {};

export default Homepage;
