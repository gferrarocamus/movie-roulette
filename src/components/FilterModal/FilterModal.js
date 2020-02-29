import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import MovieModal from '../MovieModal/MovieModal';
import FilterForm from '../FilterForm/FilterForm';
import { getByDiscover } from '../../services/api';

const FilterModal = ({
  title,
  visible,
  getMovie,
  buttonKey,
  hideModal,
}) => {
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const formRef = createRef();

  const formProps = {
    component: FilterForm,
    callback: getMovie,
  };

  const handleSubmit = () => {
    if (formRef.current.form) {
      const { form } = formRef.current;
      form.validateFields((err, params) => {
        if (err) {
          return;
        }

        getByDiscover('filter', {}, params).then((response) => {
          hideModal();
          setModalVisible(true);
          if (response.data) {
            setMovies(response.data);
            form.resetFields();
          }
        });
      });
    }
  };

  const handleCancel = () => {
    hideModal();
    console.log("cancel")
  };

  return (
    <>
      <FilterForm
        wrappedComponentRef={formRef}
        title={title}
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        {...formProps}
      />
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
  getMovie: PropTypes.func.isRequired,
  buttonKey: PropTypes.string,
};

FilterModal.defaultProps = {
  title: 'Filter',
  buttonKey: 'filter',
};

export default FilterModal;
