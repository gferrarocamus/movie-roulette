import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from '../Header';
import MainCategories from '../MainCategories';
import Empty from '../Empty';
// import FilterWrapper from '../FilterWrapper';
import Footer from '../Footer';

const { Content } = Layout;

const Homepage = (props) => {
  const [traditionalMode, setTraditionalMode] = useState(true);

  return (
    <>
      <Header
        switchable
        traditionalMode={traditionalMode}
        handleChange={() => setTraditionalMode(!traditionalMode)}
      />
      <Content className="main-container">
        {traditionalMode ? (
          <MainCategories {...props} />
        ) : (
          <Empty description="Filter Mode Coming Soon" />
        )}
      </Content>
      <Footer />
    </>
  );
};

export default Homepage;
