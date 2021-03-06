import React from 'react';
import PropTypes from 'prop-types';
import './Logo.css';

const Logo = ({ size }) => (
  <h1
    className="logo"
    style={{
      fontSize: `${size}px`,
      color: 'var(--yellow)',
      margin: '0',
      padding: '0',
    }}
  >
    MovieRoulette
  </h1>
);

Logo.propTypes = {
  size: PropTypes.string,
};

Logo.defaultProps = {
  size: '36',
};

export default Logo;
