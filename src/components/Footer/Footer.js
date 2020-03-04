import React from 'react';
import { Layout } from 'antd';
import './Footer.css';

const { Footer } = Layout;

const FooterWrapper = () => (
  <Footer style={{ textAlign: 'center' }}>
    <span className="footer-credit">
      {'Developed by '}
      <a href="https://giulianaferraro.com" target="_blank" rel="noopener noreferrer" title="Giuliana Ferraro">a film nerd</a>
      .
    </span>
    <span className="footer-credit">
      {'Inspired by the '}
      <a href="https://letterboxd.com/search/lists/random+movie+roulette/" target="_blank" rel="noopener noreferrer" title="random movie roulette">random movie roulette</a>
      {' tradition at '}
      <a href="https://letterboxd.com/" target="_blank" rel="noopener noreferrer" title="Letterboxd">Letterboxd</a>
      .
    </span>
    <span className="footer-credit">
      {'Film data and images supplied by '}
      <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" title="TMDb">TMDb</a>
      .
    </span>
    <span className="footer-credit">
      {'Icons made by '}
      <a href="https://www.flaticon.com/authors/roundicons" target="_blank" rel="noopener noreferrer" title="Roundicons">Roundicons</a>
      {' from '}
      <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer" title="Flaticon">www.flaticon.com</a>
      .
    </span>
  </Footer>
);

export default FooterWrapper;
