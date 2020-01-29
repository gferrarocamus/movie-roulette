import React from 'react';
import '../styles/style.css';
import { Layout } from 'antd';
import Logo from './Logo';
import Homepage from './Homepage';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout app-container" theme="dark" style={{ minHeight: '100%' }}>
      <Header className="header" style={{ height: 'auto', lineHeight: 'inherit' }}>
        <div style={{ margin: 'auto' }}><a href="https://gferrarocamus.github.io/movie-roulette/" title="MovieRoulette"><Logo /></a></div>
      </Header>
      <Content className="main-container" style={{ height: '100%' }}>
        <div style={{ background: '#fff', height: '100%', margin: 'auto' }}>
          <Homepage />
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
