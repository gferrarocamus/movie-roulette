import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import MovieTile from '../MovieTile/MovieTile';
import { getFromStorage, nonEmpty, updateStorage } from '../../services/lib';
import { getByDiscover, getInitial, getInitialSelection } from '../../services/api';
import { initialMovies, keys, buttons } from '../../data';
import './Homepage.css';

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [initial, setInitial] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [random, setRandom] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const fetchedMovies = [
    initial,
    trending,
    popular,
    random,
  ];

  useEffect(() => {
    updateStorage();
  }, []);

  useEffect(() => {
    if (nonEmpty(getFromStorage('initial'))) {
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
    getByDiscover('trending').then((response) => setTrending(response));
  }, []);

  useEffect(() => {
    getByDiscover('popular').then((response) => setPopular(response));
  }, []);

  useEffect(() => {
    getByDiscover('random').then((response) => setRandom(response));
  }, []);

  return (
    <div className="homepage">
      {movies && movies.map((movie, i) => (
        <MovieTile
          key={keys[i]}
          buttonKey={keys[i]}
          buttonData={buttons[i]}
          movie={movie}
          movies={fetchedMovies[i]}
          buttonsVisible={buttonsVisible}
          setButtonsVisible={setButtonsVisible}
        />
      ))}
    </div>
  );
};

// Homepage.propTypes = {};

// Homepage.defaultProps = {};

export default Homepage;
