import React from 'react';
import PropTypes from 'prop-types';
import { Button, Empty } from 'antd';
import { clearStorageByKeys } from '../../services/lib';
import popcorn from '../../images/popcorn.svg';

const buttonStyle = {
  display: 'block',
  margin: '1em auto 0',
};

const emptyStyle = {
  height: 100,
  marginTop: '1em',
};

const EmptyMovie = ({ description, hideModal }) => {
  const handleReset = () => {
    clearStorageByKeys(['bingos']);
    window.location.reload();
  };

  return (
    <Empty
      image={popcorn}
      imageStyle={emptyStyle}
      className="under-construction"
      description={description}
    >
      <p>It seems like there's nothing to show you at this time.</p>
      <Button
        shape="round"
        style={buttonStyle}
        onClick={handleReset}
      >
        Reset previously skipped movies
      </Button>
      <Button
        shape="round"
        style={buttonStyle}
        onClick={hideModal}
      >
        Try a different category
      </Button>
    </Empty>
  );
};

EmptyMovie.propTypes = {
  hideModal: PropTypes.func.isRequired,
  description: PropTypes.string,
};

EmptyMovie.defaultProps = {
  description: 'Nothing to see here',
};

export default EmptyMovie;
