import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Header from '../Header';
import Homepage from '../Homepage';
import UnderConstruction from '../UnderConstruction';
// import FilterWrapper from '../FilterWrapper';
import Footer from '../Footer';
import './App.css';

const { Content } = Layout;

function App() {
  const [traditionalMode, setTraditionalMode] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function updateWindowDimensions() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions.bind(this));

    return function cleanup() {
      window.removeEventListener('resize', updateWindowDimensions.bind(this));
    };
  });

  return (
    <Layout className="layout app-container" theme="dark" style={{ minHeight: '100%' }}>
      <Header traditionalMode={traditionalMode} handleChange={() => setTraditionalMode(!traditionalMode)} />
      <Content className="main-container">
        {
          traditionalMode
            ? <Homepage width={width} height={height} />
            : <UnderConstruction description="Filter Mode Coming Soon" />
        }
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
