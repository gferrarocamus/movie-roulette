import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import MovieModal from '../MovieModal';
import { imageURL, getMovie } from '../../services/api';

const MovieTile = ({
  buttonData,
  buttonKey,
  buttonsVisible,
  height,
  movie,
  movies,
  setButtonsVisible,
  width,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleClick = () => {
    setButtonsVisible(false);
    setModalVisible(true);
  };

  const hideModal = () => {
    setButtonsVisible(true);
    setModalVisible(false);
  };

  return (
    <Fragment key={movie.id}>
      <div
        className="backdrop-container"
        style={(
          width > 992
            ? { height: (height - 77) / 2 }
            : { height: (height - 77) / 4 }
        )}
      >
        <img
          key={movie.backdrop_path}
          className="backdrop"
          alt={movie.title}
          src={imageURL(movie.backdrop_path, 'w780')}
        />
        {buttonsVisible && (
          <Button
            shape="round"
            size="large"
            className="main-action"
            onClick={handleClick}
          >
            {buttonData[0]}
            <Icon type={buttonData[1]} theme="filled" />
          </Button>
        )}
      </div>
      <MovieModal
        key={buttonKey}
        buttonKey={buttonKey}
        title={buttonData[0]}
        visible={modalVisible}
        hideModal={hideModal}
        movies={movies}
        getMovie={getMovie}
        width={width}
        height={height}
      />
    </Fragment>
  );
};

MovieTile.propTypes = {
  buttonData: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  buttonKey: PropTypes.string.isRequired,
  buttonsVisible: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  movie: PropTypes.shape({
    backdrop_path: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  setButtonsVisible: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

MovieTile.defaultProps = {
  movies: [],
};

export default MovieTile;
