import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterWrapper = () => (
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
);

export default FooterWrapper;
