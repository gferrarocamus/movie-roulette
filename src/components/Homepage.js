import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import MovieModal from './MovieModal';
import { imageURL, getMovie, getByDiscover, getInitialSelection } from '../services/api';
import { initialMovies, keys } from '../data';
import '../styles/homepage.css';

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [random, setRandom] = useState([]);
  const [filter, setFilter] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const buttons = [
    ["Editors' Picks", 'gift'],
    ['Popular', 'fire'],
    ['Random', 'experiment'],
    ['Filter', 'control'],
  ];

  const handleClick = (i) => {
    setModalProps({
      title: buttons[i][0],
      fetch: getMovie,
      buttonKey: keys[i],
    });
    setModalVisible(true);
  };

  useEffect(() => {
    if (localStorage.MovieRoulette__initial) {
      getInitialSelection(buttons.length).then((response) => setMovies(response));
    } else {
      setMovies(initialMovies);
      getInitialSelection(buttons.length);
    }
  }, [buttons.length]);

  useEffect(() => {
    // getByDiscover('popular').then((response) => setPopular(response));
  }, []);

  useEffect(() => {
    // getByDiscover('random').then((response) => setRandom(response));
  }, []);

  return (
    <div className="homepage">
      {movies.map((movie, i) => (
        <div key={movie.id} className="backdrop-container">
          <img
            className="backdrop"
            alt={movie.title}
            src={imageURL(movie.backdrop_path, 'w780')}
          />
          <Button shape="round" size="large" className="main-action" onClick={() => handleClick(i)}>
            {buttons[i][0]}
            <Icon type={buttons[i][1]} theme="filled" />
          </Button>
        </div>
      ))}
      <MovieModal
        visible={modalVisible}
        handleCancel={() => setModalVisible(false)}
        {...modalProps}
      />
    </div>
  );
};

// Homepage.propTypes = {};

// Homepage.defaultProps = {};

export default Homepage;
