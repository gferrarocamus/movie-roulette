import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

const HeaderWrapper = ({ handleChange, switchable, traditionalMode }) => (
  <Header className="header" style={headerStyle}>
    <Link to="/" title="MovieRoulette | Discover What To Watch">
      <Logo />
    </Link>
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {switchable ? (
        <>
          <Switch
            checkedChildren={<Icon type="filter" style={iconStyle} />}
            unCheckedChildren={<Icon type="thunderbolt" style={iconStyle} />}
            onChange={handleChange}
            checked={!traditionalMode}
          />
          <Link to="/watchlist" title="Watchlist">
            <Icon
              type="menu"
              style={{
                fontSize: '20px',
                marginLeft: '1em',
              }}
            />
          </Link>
        </>
      ) : (
        <Link to="/">
          <Icon
            type="backward"
            theme="filled"
            style={{
              fontSize: '26px',
            }}
          />
        </Link>
      )}
    </span>
  </Header>
);

HeaderWrapper.propTypes = {
  handleChange: PropTypes.func,
  switchable: PropTypes.bool,
  traditionalMode: PropTypes.bool,
};

HeaderWrapper.defaultProps = {
  handleChange: () => {},
  switchable: false,
  traditionalMode: true,
};

export default HeaderWrapper;
