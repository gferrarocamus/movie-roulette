import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CategoryTile from '../CategoryTile';
import { getFromStorage, nonEmpty, updateStorage, updateBingos } from '../../services/lib';
import { getByDiscover, getInitial, getInitialSelection } from '../../services/api';
import { categoryButtons, categoryKeys, initialMovies, listKeys } from '../../data';
import './MainCategories.css';

const MainCategories = (props) => {
  const [movies, setMovies] = useState([]);
  const [initial, setInitial] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [random, setRandom] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const fetchedMovies = [
    initial,
    trending,
    popular,
    random,
  ];

  useEffect(() => {
    updateStorage(categoryKeys);
    updateBingos(listKeys);
  }, []);

  useEffect(() => {
    if (nonEmpty(getFromStorage('initial'))) {
      getInitial().then((response) => {
        setInitial(response);
        setMovies(getInitialSelection(response, categoryButtons.length));
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
    <div className="main-categories">
      {movies && movies.map((movie, i) => (
        <CategoryTile
          key={categoryKeys[i]}
          buttonKey={categoryKeys[i]}
          buttonData={categoryButtons[i]}
          movie={movie}
          movies={fetchedMovies[i]}
          buttonsVisible={buttonsVisible}
          setButtonsVisible={setButtonsVisible}
          {...props}
        />
      ))}
    </div>
  );
};

MainCategories.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default MainCategories;
