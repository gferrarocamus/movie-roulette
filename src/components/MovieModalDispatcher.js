import React from 'react';
import PropTypes from 'prop-types';
import MovieModal from './MovieModal';
import FilterModal from './FilterModal';
// import { getMovie } from '../services/api';
// import '../styles/movie_modal_dispatcher.css';

const MovieModalDispatcher = (props) => {
  const { buttonKey } = props;

  return (
    <>
      {buttonKey === 'filter'
        ? (
          <FilterModal {...props} />
        )
        : (
          <MovieModal {...props} />
        )
      }

    </>
  );
};

MovieModalDispatcher.propTypes = {
  buttonKey: PropTypes.string.isRequired,
};

export default MovieModalDispatcher;
