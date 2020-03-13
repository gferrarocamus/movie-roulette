import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Header from '../Header';
import Footer from '../Footer';

const { Content } = Layout;

const ChildPage = ({ component: Component, ...rest }) => {
  return (
    <>
      <Header />
      <Content className="main-container">
        <Component {...rest} />
      </Content>
      <Footer />
    </>
  );
};

ChildPage.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ChildPage;
