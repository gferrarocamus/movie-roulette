const routes = (key) => {
  const URLs = {
    image_base: 'https://image.tmdb.org/t/p',
    initial: 'https://api.themoviedb.org/4/list/131306',
    popular: 'https://api.themoviedb.org/4/discover/movie',
    random: 'https://api.themoviedb.org/4/discover/movie',
    trending: 'https://api.themoviedb.org/3/trending/movie/day',
    filter: 'https://api.themoviedb.org/4/discover/movie',
  };
  return URLs[key];
};

export const routeParams = (key, date = '') => {
  const params = {
    initial: {},
    popular: {
      include_adult: false,
      include_video: false,
      'with_runtime.gte': 40,
      'primary_release_date.lte': date,
      sort_by: 'vote_count.desc',
    },
    random: {
      include_adult: false,
      include_video: false,
      'with_runtime.gte': 40,
      'primary_release_date.lte': date,
      'vote_count.gte': 100,
      'vote_average.gte': 5,
      sort_by: 'popularity.asc',
    },
    trending: {},
  };
  return params[key];
};

export default routes;
