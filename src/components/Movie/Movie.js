import React from 'react';
import { Col, Icon, Row, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import GenreTag from '../GenreTag';
import { imageURL } from '../../services/api';
import { yearFromDate } from '../../services/lib';
import pattern from '../../images/pattern.png';
import './Movie.css';

const Movie = ({ movie, pin }) => (
  <Row type="flex" gutter={{ xs: 16, sm: 20, md: 24, lg: 32 }} className="movie">
    <Col>
      <img
        alt={movie.title}
        title={movie.title}
        src={movie.poster_path ? imageURL(movie.poster_path, 'w342') : pattern}
        className="poster"
      />
    </Col>
    <Col style={{ flex: 1, minWidth: '200px' }}>
      <h1 style={{ marginBottom: 0 }}>
        {movie.title}
        &nbsp;
        <small>{`(${yearFromDate(movie.release_date)})`}</small>
        &nbsp;
        {pin && (
          <Tooltip title="You should watch this!" placement="right">
            <Icon type="pushpin" theme="filled" style={{ color: 'var(--light-accent)' }} />
          </Tooltip>
        )}
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
        {'Read More '}
        <Icon type="arrow-right" />
      </a>
    </Col>
  </Row>
);

Movie.propTypes = {
  pin: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    poster_path: PropTypes.string,
  }).isRequired,
};

export default Movie;
