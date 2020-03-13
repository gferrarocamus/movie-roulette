import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Homepage from '../Homepage';
import ChildPage from '../ChildPage';
import Watchlist from '../Watchlist';
import './App.css';

function App() {
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
  }, []);

  return (
    <Router>
      <Layout theme="dark" style={{ minHeight: '100%' }}>
        <Switch>
          <Route exact path="/">
            <Homepage width={width} height={height} />
          </Route>
          <Route path="/watchlist">
            <ChildPage component={Watchlist} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
