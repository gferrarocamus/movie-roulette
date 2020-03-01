import React, { useState } from 'react';
import { Layout, Switch } from 'antd';
import Logo from '../Logo/Logo';
import Homepage from '../Homepage';
import FilterForm from '../FilterForm';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const [traditionalMode, setTraditionalMode] = useState(true);
  const handleChange = () => {
    setTraditionalMode(!traditionalMode);
  };

  return (
    <Layout className="layout app-container" theme="dark" style={{ minHeight: '100%' }}>
      <Header className="header" style={{ height: 'auto', lineHeight: 'inherit' }}>
        <a href="https://movieroulette.herokuapp.com/" title="MovieRoulette"><Logo /></a>
        <Switch
          checkedChildren="Traditional"
          unCheckedChildren="Custom"
          defaultChecked
          onChange={handleChange}
        />
      </Header>
      <Content className="main-container" style={{ height: '100%' }}>
        <div style={{ background: '#fff', height: '100%', margin: 'auto' }}>
          {
            traditionalMode
              ? <Homepage />
              : <FilterForm />
          }
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {'Developed by '}
        <a href="https://giulianaferraro.com" target="_blank" rel="noopener noreferrer" title="Giuliana Ferraro">a film nerd</a>
        {'. Powered by '}
        <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" title="The Movie DB">The Movie DB</a>
        {'. Icons made by '}
        <a href="https://www.flaticon.com/authors/roundicons" target="_blank" rel="noopener noreferrer" title="Roundicons">Roundicons</a>
        {' from '}
        <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer" title="Flaticon">www.flaticon.com</a>
        .
      </Footer>
    </Layout>
  );
}

export default App;
