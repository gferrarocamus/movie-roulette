const routes = (key) => {
  const URLs = {
    image_base: 'https://image.tmdb.org/t/p',
    initial: 'https://api.themoviedb.org/4/list/131306',
    popular: 'https://api.themoviedb.org/4/discover/movie',
  };
  return URLs[key];
};

export default routes;
