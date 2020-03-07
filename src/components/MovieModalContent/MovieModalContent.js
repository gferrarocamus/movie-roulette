import React from 'react';
import PropTypes from 'prop-types';
import EmptyMovie from '../EmptyMovie';
import Movie from '../Movie';

const MovieModalContent = ({ movie, rejected, hideModal }) => (
  movie
    ? <Movie movie={movie} pin={!rejected} />
    : <EmptyMovie hideModal={hideModal} />
);

MovieModalContent.propTypes = {
  movie: PropTypes.oneOfType([
    PropTypes.shape({}).isRequired,
    PropTypes.number,
  ]),
  rejected: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

MovieModalContent.defaultProps = {
  movie: null,
};

export default MovieModalContent;
