import React, { useState } from 'react';
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

  return (
    <Layout className="layout app-container" theme="dark" style={{ minHeight: '100%' }}>
      <Header traditionalMode={traditionalMode} handleChange={() => setTraditionalMode(!traditionalMode)} />
      <Content className="main-container">
        {
          traditionalMode
            ? <Homepage />
            : <UnderConstruction description="Filter Mode Coming Soon" />
        }
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
