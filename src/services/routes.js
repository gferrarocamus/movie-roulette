export const routes = (key) => {
  const URLs = {
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

export const imageConfig = {
  base_url: 'http://image.tmdb.org/t/p/',
  secure_base_url: 'https://image.tmdb.org/t/p/',
  backdrop_sizes: [
    'w300',
    'w780',
    'w1280',
    'original',
  ],
  logo_sizes: [
    'w45',
    'w92',
    'w154',
    'w185',
    'w300',
    'w500',
    'original',
  ],
  poster_sizes: [
    'w92',
    'w154',
    'w185',
    'w342',
    'w500',
    'w780',
    'original',
  ],
  profile_sizes: [
    'w45',
    'w185',
    'h632',
    'original',
  ],
  still_sizes: [
    'w92',
    'w185',
    'w300',
    'original',
  ],
};

export default routes;
