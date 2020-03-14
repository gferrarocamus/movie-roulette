import React, { useState } from 'react';
import { Layout } from 'antd';
import { CSSTransition } from 'react-transition-group';
import Header from '../Header';
import MainCategories from '../MainCategories';
import Empty from '../Empty';
// import FilterWrapper from '../FilterWrapper';
import Footer from '../Footer';
import './Homepage.css';

const { Content } = Layout;

const Homepage = (props) => {
  const [traditionalMode, setTraditionalMode] = useState(true);
  const [filterMode, setFilterMode] = useState(false);

  return (
    <>
      <Header
        switchable
        traditionalMode={traditionalMode}
        handleChange={() => setTraditionalMode(!traditionalMode)}
      />
      <Content className="main-container">
        {filterMode && <Empty description="Filter Mode Coming Soon" />}
        <CSSTransition
          appear
          classNames="transition"
          in={traditionalMode}
          timeout={300}
          onEnter={() => setFilterMode(false)}
          onExited={() => setFilterMode(true)}
        >
          <MainCategories {...props} />
        </CSSTransition>
      </Content>
      <Footer />
    </>
  );
};

export default Homepage;
