import React, { useState, useEffect } from 'react';
import { Col, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import GenreTag from '../GenreTag';
import { imageURL } from '../../services/api';
import { yearFromDate } from '../../services/lib';

const MovieModal = ({ title, visible, movies, getMovie, buttonKey, hideModal }) => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [rejected, setRejected] = useState(true);

  const handleOk = () => {
    setRejected(true);
    setLoading(true);
    getMovie(buttonKey, movies).then((response) => {
      setMovie(response);
      setLoading(false);
    });
    console.log('OK');
  };

  const handleCancel = () => {
    console.log("cancel")
    setRejected(false);
    hideModal();
  };

  useEffect(() => {
    console.log(buttonKey, movies)
    if (rejected && movies.length > 0) {
      getMovie(buttonKey, movies).then((response) => setMovie(response));
    }
  }, [buttonKey, getMovie, movies, rejected]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      loading={loading}
      okButtonProps={{ shape: 'round', type: 'default' }}
      cancelButtonProps={{ shape: 'round' }}
      okText="No, show me more"
      cancelText="Sure, I'll watch that"
    >
      {console.log(JSON.stringify(movie))}
      {!loading && (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <img
              alt={movie.title}
              src={imageURL(movie.poster_path)}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <h1>
              {movie.title}
              <small>{` ${yearFromDate(movie.release_date)}`}</small>
            </h1>
            {(movie.title !== movie.original_title) && <small><em>{movie.original_title}</em></small>}
            <div className="genres">
              {(movie.genre_ids !== undefined) && movie.genre_ids.map((id) => <GenreTag key={id} id={id} />)}
            </div>
            <p>{movie.overview}</p>
            <a target="_blank" rel="noopener noreferrer" title="Read More" href={`https://www.themoviedb.org/movie/${movie.id}`}>Read More</a>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

MovieModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  getMovie: PropTypes.func,
  buttonKey: PropTypes.string,
};

MovieModal.defaultProps = {
  getMovie: () => Promise.resolve(),
  title: 'You Should Watch This!',
  buttonKey: 'initial',
  movies: [{}],
};

export default MovieModal;
