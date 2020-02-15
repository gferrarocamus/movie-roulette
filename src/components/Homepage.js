import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import MovieModal from './MovieModal';
import { imageURL, getMovie, getEditorsPicksSelection } from '../services/api';
import { initialMovies } from '../data';
import '../styles/homepage.css';

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const buttons = [
    ["Editors' Picks", 'gift'],
    ['Popular', 'fire'],
    ['Random', 'experiment'],
    ['Filter', 'control'],
  ];

  const buttonKeys = [
    'initial',
    'popular',
    'random',
    'filter',
  ];

  const handleClick = (i) => {
    setModalProps({
      title: buttons[i][0],
      fetch: getMovie,
      buttonKey: buttonKeys[i],
    });
    setModalVisible(true);
  };

  useEffect(() => {
    if (localStorage.MovieRoulette__initial) {
      getEditorsPicksSelection(buttons.length).then((response) => setMovies(response.flat()));
    } else {
      setMovies(initialMovies);
      getEditorsPicksSelection(buttons.length);
    }
  }, [buttons.length]);

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
