import React from 'react';
import '../styles/style.css';
import { Layout } from 'antd';
import Logo from './Logo';
import Homepage from './Homepage';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout app-container" style={{ height: '100%' }}>
      <Header className="header" style={{ height: 'auto', lineHeight: 'inherit' }}><Logo /></Header>
      <Content className="main-container" style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, height: '100%' }}>
          Hello World!
          <Homepage />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {'Developed by '}
        <a href="https://giulianaferraro.com" title="Giuliana Ferraro">a film nerd</a>
        {'. Powered by '}
        <a href="https://www.themoviedb.org" title="The Movie DB">The Movie DB</a>
        {'. Icons made by '}
        <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a>
        {' from '}
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        .
      </Footer>
    </Layout>
  );
}

export default App;
