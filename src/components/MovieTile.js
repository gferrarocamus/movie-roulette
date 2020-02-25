import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import MovieModalDispatcher from './MovieModalDispatcher';
import { imageURL, getMovie } from '../services/api';
// import '../styles/movie_tile.css';

const MovieTile = ({ movie, movies, buttonKey, buttonData }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Fragment key={movie.id}>
      <div className="backdrop-container">
        <img
          key={movie.backdrop_path}
          className="backdrop"
          alt={movie.title}
          src={imageURL(movie.backdrop_path, 'w780')}
        />
        <Button
          shape="round"
          size="large"
          className="main-action"
          onClick={() => setModalVisible(true)}
        >
          {buttonData[0]}
          <Icon type={buttonData[1]} theme="filled" />
        </Button>
      </div>
      <MovieModalDispatcher
        key={buttonKey}
        buttonKey={buttonKey}
        title={buttonData[0]}
        visible={modalVisible}
        hideModal={() => setModalVisible(false)}
        movies={movies}
        getMovie={getMovie}
      />
    </Fragment>
  );
};

MovieTile.propTypes = {
  buttonKey: PropTypes.string.isRequired,
  buttonData: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  movie: PropTypes.shape({
    backdrop_path: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

MovieTile.defaultProps = {
  movies: [],
};

export default MovieTile;
