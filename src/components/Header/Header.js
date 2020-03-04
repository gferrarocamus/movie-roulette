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

const HeaderWrapper = ({ traditionalMode, handleChange }) => (
  <Header className="header" style={headerStyle}>
    <a href="https://movieroulette.herokuapp.com/" title="MovieRoulette | Discover What To Watch">
      <Logo />
    </a>
    <span>
      <Switch
        checkedChildren={<Icon type="filter" style={iconStyle} />}
        unCheckedChildren={<Icon type="thunderbolt" style={iconStyle} />}
        onChange={handleChange}
        checked={!traditionalMode}
      />
    </span>
  </Header>
);

HeaderWrapper.propTypes = {
  traditionalMode: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default HeaderWrapper;
