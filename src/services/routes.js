const routes = (key) => {
  const URLs = {
    initial: 'https://api.themoviedb.org/4/list/131306',
  };
  return URLs[key];
};

export default routes;
