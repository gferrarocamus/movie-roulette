import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Icon } from 'antd';
import popcorn from '../../images/popcorn.svg';
import './Empty.css';

const EmptyWrapper = ({ description, imageStyle, content }) => (
  <Empty
    image={popcorn}
    imageStyle={imageStyle}
    className="empty"
    description={description}
  >
    {content}
  </Empty>
);

EmptyWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.number]),
  description: PropTypes.string,
  imageStyle: PropTypes.shape({}),
};

EmptyWrapper.defaultProps = {
  content: (
    <>
      <div>In the meantime...</div>
      <a
        href="mailto:hey@giulianaferraro.com"
        title="Send feedback by email"
      >
        Feedback? <Icon type="mail" theme="filled" />
      </a>
    </>
  ),
  description: 'No Data',
  imageStyle: {
    height: 100,
  },
};

export default EmptyWrapper;
