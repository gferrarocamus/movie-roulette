import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { imageSrcSet, imageURL, removeFromBingos } from '../../services/api';
import { yearFromDate } from '../../services/lib';
import pattern from '../../images/pattern.png';
import './ListItem.css';

const ListItem = ({ list, movie, setList, setUpdated, width }) => {
  const [image, setImage] = useState(pattern);
  const [srcSet, setSrcSet] = useState('');

  const handleClick = () => {
    removeFromBingos(movie.id);
    setList(list.filter((item) => item.id !== movie.id));
    setUpdated(true);
  };

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
    <div className="list-item-container">
      <img
        srcSet={srcSet}
        alt={movie.title}
        title={movie.title}
        src={image}
        className="poster list-item-poster"
      />
      <div className="list-item-details">
        <Icon className="list-item-icon" type="close" onClick={handleClick} />
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={`${movie.title} on TMDb`}
          href={`https://www.themoviedb.org/movie/${movie.id}`}
        >
          <h3 style={{ marginBottom: 0 }}>
            {movie.title}
            {' '}
            <small>{`(${yearFromDate(movie.release_date)})`}</small>
          </h3>
          {movie.title !== movie.original_title && (
            <h4>
              <small>
                <em>{movie.original_title}</em>
              </small>
            </h4>
          )}
        </a>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  setList: PropTypes.func.isRequired,
  setUpdated: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export default ListItem;
