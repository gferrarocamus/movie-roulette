import React, { useState, createRef } from 'react';
import MovieModal from '../MovieModal/MovieModal';
import FilterForm from '../FilterForm/FilterForm';
import { getByDiscover, getMovie } from '../../services/api';

const FilterWrapper = () => {
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const formRef = createRef();

  const modalProps = {
    title: 'Filter',
    buttonKey: 'filter',
  };

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
    console.log("cancel")
  };

  return (
    <>
      <FilterForm
        wrappedComponentRef={formRef}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        {...formProps}
      />
      <MovieModal
        visible={modalVisible}
        hideModal={() => setModalVisible(false)}
        movies={movies}
        getMovie={getMovie}
        {...modalProps}
      />
    </>
  );
};

export default FilterWrapper;
