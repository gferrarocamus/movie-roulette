import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { genreNameFromId } from '../../services/lib';
import { genres } from '../../data';

const GenreTag = ({ id, color }) => (
  <Tag color={color} style={{ marginBottom: '0.5em' }}>
    {genreNameFromId(genres, id)}
  </Tag>
);

GenreTag.propTypes = {
  id: PropTypes.number.isRequired,
  color: PropTypes.string,
};

GenreTag.defaultProps = {
  color: '#d1a422',
};

export default GenreTag;
