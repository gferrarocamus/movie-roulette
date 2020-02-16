import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
// import { getMovie } from '../services/api';
import '../styles/movie_modal.css';

const MovieModal = ({ title, visible, movies, getMovie, buttonKey, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const handleOk = () => {
    setConfirmLoading(true);
    getMovie(buttonKey, movies).then((response) => setMovie(response));
    console.log('OK');
    setConfirmLoading(false);
  };

  useEffect(() => {
    if (buttonKey !== 'filter') {
      getMovie(buttonKey, movies).then((response) => setMovie(response));
    }
  }, [buttonKey, getMovie, movies]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okButtonProps={{ shape: 'round', type: 'default' }}
      cancelButtonProps={{ shape: 'round' }}
      okText="No, show me more"
      cancelText="Sure, I'll watch that"
    >
      <p>{JSON.stringify(movie)}</p>
    </Modal>
  );
};

MovieModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  ),
  getMovie: PropTypes.func,
  buttonKey: PropTypes.string,
};

MovieModal.defaultProps = {
  getMovie: () => Promise.resolve(),
  title: 'You Should Watch This!',
  buttonKey: 'initial',
  movies: [[{}]],
};

export default MovieModal;
