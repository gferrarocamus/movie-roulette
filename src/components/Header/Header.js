import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout, Switch } from 'antd';
import Logo from '../Logo/Logo';

const { Header } = Layout;

const headerStyle = {
  height: 'auto',
  lineHeight: 'inherit',
};

const iconStyle = {
  color: 'var(--light-accent)',
  fontSize: '20px',
  padding: '2px',
};

const HeaderWrapper = ({ handleChange }) => (
  <Header className="header" style={headerStyle}>
    <a href="https://movieroulette.herokuapp.com/" title="MovieRoulette">
      <Logo />
    </a>
    <span>
      <Switch
        checkedChildren={<Icon type="filter" style={iconStyle} />}
        unCheckedChildren={<Icon type="thunderbolt" style={iconStyle} />}
        onChange={handleChange}
      />
    </span>
  </Header>
);

HeaderWrapper.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default HeaderWrapper;
