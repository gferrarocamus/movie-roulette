const routes = (key) => {
  const URLs = {
    image_base: 'https://image.tmdb.org/t/p',
    initial: 'https://api.themoviedb.org/4/list/131306',
    popular: 'https://api.themoviedb.org/4/discover/movie',
    random: 'https://api.themoviedb.org/4/discover/movie',
    trending: 'https://api.themoviedb.org/4/trending/movie/day',
    filter: 'https://api.themoviedb.org/4/discover/movie',
  };
  return URLs[key];
};

export const routeParams = (key, date = '') => {
  const params = {
    initial: {},
    popular: {
      sort_by: 'popularity.desc',
    },
    random: {
      include_adult: false,
      include_video: false,
      'primary_release_date.lte': date,
      'vote_count.gte': 100,
      'vote_average.gte': 2,
      'with_runtime.gte': 40,
      sort_by: 'popularity.desc',
    },
    trending: {},
  };
  return params[key];
};

export default routes;
