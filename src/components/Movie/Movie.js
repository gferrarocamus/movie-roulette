import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon, Row, Tooltip } from 'antd';
import GenreTag from '../GenreTag';
import { imageSrcSet, imageURL } from '../../services/api';
import { yearFromDate } from '../../services/lib';
import pattern from '../../images/pattern.png';
import './Movie.css';

const Movie = ({ movie, pin, width }) => {
  const [image, setImage] = useState(pattern);
  const [srcSet, setSrcSet] = useState('');

  useEffect(() => {
    if (width > 462) {
      setImage(imageURL(movie.poster_path, 'w342'));
      setSrcSet(imageSrcSet(movie.poster_path, [154, 185, 342]));
    } else {
      setImage(imageURL(movie.backdrop_path, 'w300'));
      setSrcSet(imageSrcSet(movie.backdrop_path, [300, 780]));
    }
  }, [width, movie.poster_path, movie.backdrop_path]);

  return (
    <Row type="flex" gutter={{ xs: 16, sm: 20, md: 24, lg: 32 }} className="movie">
      {console.log(movie.title)}
      <Col>
        <img
          srcSet={srcSet}
          alt={movie.title}
          title={movie.title}
          src={image}
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
              <Icon
                type="pushpin"
                theme="filled"
                style={{ color: 'var(--light-accent)' }}
                className="pin"
              />
            </Tooltip>
          )}
        </h1>
        {movie.title !== movie.original_title && (
          <h2><small><em>{movie.original_title}</em></small></h2>
        )}
        <div style={{ marginTop: '1em', marginBottom: '0.5em' }}>
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
};

Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  pin: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
};

export default Movie;
