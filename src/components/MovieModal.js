import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import '../styles/movie_modal.css';

const MovieModal = ({ visible, handleOk, handleCancel, confirmLoading }) => (
  <Modal
    title="Title"
    visible={visible}
    onOk={handleOk}
    confirmLoading={confirmLoading}
    onCancel={handleCancel}
    okButtonProps={{ shape: 'round', type: 'default' }}
    cancelButtonProps={{ shape: 'round' }}
  >
    <p>Modal! Text!</p>
  </Modal>
);

MovieModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  confirmLoading: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
};

MovieModal.defaultProps = {
  confirmLoading: false,
  handleOk: () => {},
  handleCancel: () => {},
};

export default MovieModal;
