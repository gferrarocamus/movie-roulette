import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import MovieModal from './MovieModal';
import { imageURL, getEditorsPicksSelection } from '../services/api';
import { initialMovies } from '../data';
import '../styles/homepage.css';

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const buttons = [
    ["Editors' Picks", 'gift'],
    ['Popular', 'fire'],
    ['Random', 'experiment'],
    ['Filter', 'control'],
  ];

  useEffect(() => {
    if (localStorage.MovieRoulette__editorsPicks) {
      getEditorsPicksSelection(buttons.length).then((response) => setMovies(response));
    } else {
      setMovies(initialMovies);
      getEditorsPicksSelection(buttons.length);
    }
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
          <Button shape="round" size="large" className="main-action" onClick={() => setModalVisible(true)}>
            {buttons[i][0]}
            <Icon type={buttons[i][1]} theme="filled" />
          </Button>
        </div>
      ))}
      <MovieModal visible={modalVisible} />
    </div>
  );
};

// Homepage.propTypes = {};

// Homepage.defaultProps = {};

export default Homepage;