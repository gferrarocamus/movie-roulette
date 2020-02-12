import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import '../styles/movie_modal.css';

const MovieModal = ({ title, visible, fetch, buttonKey, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const handleOk = () => {
    setConfirmLoading(true);
    fetch(buttonKey);
    console.log('OK');
    setConfirmLoading(false);
  };

  useEffect(() => {
    if (buttonKey !== 'filter') {
      fetch(buttonKey).then((response) => setMovie(response));
    }
  }, [buttonKey, fetch]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okButtonProps={{ shape: 'round', type: 'default' }}
      cancelButtonProps={{ shape: 'round' }}
    >
      <p>Modal! Text!</p>
      <p>{JSON.stringify(movie)}</p>
    </Modal>
  );
};

MovieModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  fetch: PropTypes.func,
  buttonKey: PropTypes.string,
};

MovieModal.defaultProps = {
  fetch: () => Promise.resolve(),
  title: 'You Should Watch This!',
  buttonKey: 'initial',
};

export default MovieModal;
