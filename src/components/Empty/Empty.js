import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Icon } from 'antd';
import popcorn from '../../images/popcorn.svg';
import './Empty.css';

const CTA = () => (
  <>
    <div>In the meantime...</div>
    <a href="mailto:giuliana.ferraro.dev@gmail.com" title="Send feedback by email">Feedback? <Icon type="mail" theme="filled" /></a>
  </>
);

const EmptyWrapper = ({ description, content: Content }) => (
  <Empty
    image={popcorn}
    imageStyle={{
      height: 100,
    }}
    className="empty"
    description={description}
  >
    <Content />
  </Empty>
);

EmptyWrapper.propTypes = {
  content: PropTypes.elementType,
  description: PropTypes.string,
};

EmptyWrapper.defaultProps = {
  content: CTA,
  description: 'No Data',
};

export default EmptyWrapper;
