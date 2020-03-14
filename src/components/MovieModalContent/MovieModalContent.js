import React from 'react';
import PropTypes from 'prop-types';
import EmptyMovie from '../EmptyMovie';
import Movie from '../Movie';

const MovieModalContent = ({ movie, pin, hideModal, ...rest }) => (
  movie
    ? <Movie movie={movie} pin={pin} {...rest} />
    : <EmptyMovie hideModal={hideModal} />
);

MovieModalContent.propTypes = {
  hideModal: PropTypes.func.isRequired,
  movie: PropTypes.oneOfType([
    PropTypes.shape({}).isRequired,
    PropTypes.number,
  ]),
  pin: PropTypes.bool.isRequired,
};

MovieModalContent.defaultProps = {
  movie: null,
};

export default MovieModalContent;
