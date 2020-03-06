import React, { useState, useEffect } from 'react';
import { Button, Icon, Modal, Spin, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import { addToBingos } from '../../services/api';
import './MovieModal.css';

const MovieModal = ({
  buttonKey,
  getMovie,
  hideModal,
  movies,
  title,
  visible,
}) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState(true);

  const buttonTooltips = {
    popular: (
      <span>
        {'Based on number of user votes at '}
        <a href="https://themoviedb.org/">TMDB</a>
      </span>
    ),
    trending: (
      <span>
        {'Based on user activity increase in the last 24 hours at '}
        <a href="https://developers.themoviedb.org/3/trending/get-trending">TMDb</a>
      </span>
    ),
  };

  const handleOk = () => {
    setRejected(true);
    setLoading(true);
    setTimeout(() => {
      getMovie(buttonKey, movies).then((response) => {
        setMovie(response);
        setLoading(false);
      });
    }, 1000);
  };

  const handleCancel = () => {
    setRejected(false);
    hideModal();
  };

  useEffect(() => {
    if (visible && rejected && movies.length > 0) {
      getMovie(buttonKey, movies).then((response) => setMovie(response));
    }
  }, [buttonKey, getMovie, movies, rejected, visible]);

  useEffect(() => {
    if (visible && movie && movie.id) {
      addToBingos(movie);
    }
  }, [movie, visible]);

  return (
    <Modal
      title={(
        <>
          {title}
          &nbsp;
          {buttonTooltips[buttonKey] && (
            <Tooltip title={buttonTooltips[buttonKey]} placement="right" overlayStyle={{ maxWidth: '100%' }}>
              <Icon type="question-circle" style={{ fontSize: '0.8em', opacity: 0.5 }} />
            </Tooltip>
          )}
        </>
      )}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={720}
      okButtonProps={{ shape: 'round', type: 'default' }}
      cancelButtonProps={{ shape: 'round' }}
      centered
      footer={[
        <Button shape="round" loading={loading} key="more" onClick={handleOk}>
          No, show me more
        </Button>,
        <Button shape="round" type="default" key="sure" onClick={handleCancel}>
          Sure, I'll watch that
        </Button>,
      ]}
      bodyStyle={{ minHeight: '348px' }}
    >
      {loading
        ? <Spin size="large" style={{ lineHeight: '300px', margin: 'auto', display: 'block' }} />
        : movie && <Movie movie={movie} pin={!rejected} />
      }
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
