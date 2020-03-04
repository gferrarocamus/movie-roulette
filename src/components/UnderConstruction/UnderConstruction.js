import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Icon } from 'antd';
import popcorn from '../../images/popcorn.svg';
import './UnderConstruction.css';

const UnderConstruction = ({ description }) => (
  <Empty
    image={popcorn}
    imageStyle={{
      height: 100,
    }}
    className="under-construction"
    description={description}
  >
    <div>In the meantime...</div>
    <a href="mailto:giuliana.ferraro.dev@gmail.com" title="Send feedback by email">Feedback? <Icon type="mail" theme="filled" /></a>
  </Empty>
);

UnderConstruction.propTypes = {
  description: PropTypes.string.isRequired,
};

export default UnderConstruction;
