import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import { addToBingos } from '../../services/api';

const MovieModal = ({ title, visible, movies, getMovie, buttonKey, hideModal }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (visible && movie && movie.id) {
      addToBingos(movie);
    }
  }, [movie, visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      loading={loading}
      width={720}
      okButtonProps={{ shape: 'round', type: 'default' }}
      cancelButtonProps={{ shape: 'round' }}
      okText="No, show me more"
      cancelText="Sure, I'll watch that"
    >
      {console.log(JSON.stringify(movie))}
      {!loading && movie && <Movie movie={movie} />}
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
