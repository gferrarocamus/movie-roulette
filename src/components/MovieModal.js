import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import '../styles/movie_modal.css';

const MovieModal = ({ title, visible, movies, getMovie, buttonKey, hideModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [rejected, setRejected] = useState(true);

  const handleOk = () => {
    setRejected(true);
    setConfirmLoading(true);
    getMovie(buttonKey, movies).then((response) => {
      setMovie(response);
      setConfirmLoading(false);
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
