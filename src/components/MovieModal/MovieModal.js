import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Icon, Modal, Spin, Tooltip } from 'antd';
import { addToBingos, addToList } from '../../services/api';
import MovieModalContent from '../MovieModalContent';
import './MovieModal.css';

const MovieModal = ({
  buttonKey,
  getMovie,
  hideModal,
  movies,
  title,
  visible,
  ...rest
}) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState(true);
  const [pending, setPending] = useState(false);
  const history = useHistory();

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

  const handleNo = () => {
    setPending(false);
    setRejected(true);
    setLoading(true);
    setTimeout(() => {
      getMovie(buttonKey, movies).then((response) => {
        setMovie(response);
        setLoading(false);
      });
    }, 1000);
  };

  const handleYes = () => {
    const delay = (rejected || pending) ? 500 : 0;
    setPending(false);
    setRejected(false);
    addToList(movie, 'watchlist');
    setTimeout(() => {
      hideModal();
      history.push('/watchlist');
    }, delay);
  };

  const handleCancel = () => {
    setPending(true);
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

  const footer = [
    <Button shape="round" loading={loading} key="more" onClick={handleNo}>
      No, show me more
    </Button>,
    <Button shape="round" type="default" key="sure" onClick={handleYes}>
      Sure, I'll watch that
    </Button>,
  ];

  return (
    <Modal
      bodyStyle={{ minHeight: '348px' }}
      cancelButtonProps={{ shape: 'round' }}
      centered
      footer={movie ? footer : null}
      okButtonProps={{ shape: 'round', type: 'default' }}
      onCancel={handleCancel}
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
      width={720}
    >
      {loading
        ? (
          <Spin
            size="large"
            style={{ lineHeight: '300px', margin: 'auto', display: 'block' }}
          />
        ) : (
          <MovieModalContent
            pin={!pending && !rejected}
            movie={movie}
            hideModal={hideModal}
            {...rest}
          />
        )
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
