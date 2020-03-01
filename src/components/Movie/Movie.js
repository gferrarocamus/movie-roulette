import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import GenreTag from '../GenreTag';
import { imageURL } from '../../services/api';
import { yearFromDate } from '../../services/lib';
import './Movie.css';

const Movie = ({ movie }) => (
  <Row type="flex" gutter={{ xs: 16, sm: 20, md: 24, lg: 32 }}>
    <Col>
      <img
        alt={movie.title}
        src={imageURL(movie.poster_path, 'w342')}
        width="200"
        className="poster"
      />
    </Col>
    <Col style={{ flex: 1, minWidth: '200px' }}>
      <h1 style={{ marginBottom: 0 }}>
        {movie.title}
        {' '}
        <small>{`(${yearFromDate(movie.release_date)})`}</small>
      </h1>
      {movie.title !== movie.original_title && (
        <h2><small><em>{movie.original_title}</em></small></h2>
      )}
      <div style={{ margin: '1em 0' }}>
        {movie.genre_ids !== undefined && movie.genre_ids.map((id) => <GenreTag key={id} id={id} />)}
      </div>
      <p>{movie.overview}</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        title="Read More"
        href={`https://www.themoviedb.org/movie/${movie.id}`}
      >
        Read More
      </a>
    </Col>
  </Row>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default Movie;
