import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from '../Header';
import Homepage from '../Homepage';
import FilterWrapper from '../FilterWrapper';
import Footer from '../Footer';
import './App.css';

const { Content } = Layout;

function App() {
  const [traditionalMode, setTraditionalMode] = useState(true);

  return (
    <Layout className="layout app-container" theme="dark" style={{ minHeight: '100%' }}>
      <Header handleChange={() => setTraditionalMode(!traditionalMode)} />
      <Content className="main-container" style={{ height: '100%' }}>
        <div style={{ height: '100%', margin: 'auto' }}>
          {
            traditionalMode
              ? <Homepage />
              : <FilterWrapper />
          }
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
