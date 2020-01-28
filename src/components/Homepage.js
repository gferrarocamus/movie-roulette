import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import { getResource, imageURL, getEditorsPicks } from '../services/api';
import '../styles/homepage.css';

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const gridStyle = {
    width: 'auto',
    height: 'auto',
    textAlign: 'center',
    padding: '0',
  };

  useEffect(() => {
    // getResource('initial', { sort_by: 'vote_average.desc' }).then((response) => {
    //   if (response.data && response.data.results && response.data.total_results > 0) {
    //     setMovies(response.data.results);
    //   } else {
    //     if (response.error.status === 404) console.log("not found");

    //     console.log(response.error);
    //   }
    // });
    getEditorsPicks().then((response) => {
      setMovies(response);
    });
  }, []);

  return (
    <>
      <Card bordered={false} style={{ width: 'fit-content' }}>
        {movies.map((movie) => (
          <Card.Grid key={movie.id} style={gridStyle}>
            <Card
              type="inner"
              cover={
                (
                  <img
                    width="185px"
                    height="278px"
                    alt={movie.original_title}
                    src={imageURL(movie.poster_path)}
                  />
                )
              }
            />
          </Card.Grid>
        ))}
      </Card>
      <Button>Editors' Picks</Button>
      <Button>Popular</Button>
      <Button>New Releases</Button>
    </>
  );
};

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
