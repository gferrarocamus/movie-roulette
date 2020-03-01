import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterWrapper = () => (
  <Footer style={{ textAlign: 'center' }}>
    {'Developed by '}
    <a href="https://giulianaferraro.com" target="_blank" rel="noopener noreferrer" title="Giuliana Ferraro">a film nerd</a>
    {'. Inspired by the '}
    <a href="https://letterboxd.com/search/lists/random+movie+roulette/" target="_blank" rel="noopener noreferrer" title="random movie roulette">random movie roulette</a>
    {' tradition at '}
    <a href="https://letterboxd.com/" target="_blank" rel="noopener noreferrer" title="Letterboxd">Letterboxd</a>
    .<br />{'Film data and images supplied by '}
    <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" title="TMDb">TMDb</a>
    {'. Icons made by '}
    <a href="https://www.flaticon.com/authors/roundicons" target="_blank" rel="noopener noreferrer" title="Roundicons">Roundicons</a>
    {' from '}
    <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer" title="Flaticon">www.flaticon.com</a>
    .
  </Footer>
);

export default FooterWrapper;
