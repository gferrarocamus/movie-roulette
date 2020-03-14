import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Empty from '../Empty';
import { clearStorageByKeys } from '../../services/lib';

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

  const content = (
    <>
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
    </>
  );

  return (
    <Empty
      imageStyle={emptyStyle}
      description={description}
      content={content}
    />
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
