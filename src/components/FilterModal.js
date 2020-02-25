import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import MovieModal from './MovieModal';
// import '../styles/filter_modal.css';

const FilterModal = ({ title, visible, getMovie, buttonKey, hideModal }) => {
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOk = () => {
    console.log('OK');
  };

  const handleCancel = () => {
    hideModal();
    console.log("cancel")
  };

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        FORM
      </Modal>
      <MovieModal
        title={title}
        visible={modalVisible}
        hideModal={() => setModalVisible(false)}
        buttonKey={buttonKey}
        movies={movies}
        getMovie={getMovie}
      />
    </>
  );
};

FilterModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  getMovie: PropTypes.func,
  buttonKey: PropTypes.string,
};

FilterModal.defaultProps = {
  getMovie: () => Promise.resolve(),
  title: 'Filter',
  buttonKey: 'filter',
};

export default FilterModal;
