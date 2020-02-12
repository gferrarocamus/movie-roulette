import React, { useState } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import '../styles/movie_modal.css';

const MovieModal = ({ title, visible, fetch, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    fetch();
    console.log("OK");
    setConfirmLoading(false);
  };

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
    </Modal>
  );
};

MovieModal.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  fetch: PropTypes.func,
};

MovieModal.defaultProps = {
  fetch: () => {},
};

export default MovieModal;
