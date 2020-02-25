import { getResource } from './axios';
import routes, { routeParams } from './routes';
import {
  selectNFromArray,
  selectOneFromArray,
  objectToArray,
  todayISO,
  localStorageKey,
  getFromStorage,
  setToStorage,
} from './lib';

const fetchMore = (key, previousPage, lastPage, prev = []) => {
  let page = previousPage;
  let promiseChain = Promise.resolve();
  const results = [...prev];
  const max = key === 'initial' ? 500 : 1000; // as per TMDB's API definition

  while (page < lastPage) {
    page += 1;

    if (page >= max) {
      promiseChain.reject();
      break;
    }

    const makeNextPromise = (currentPage) => () => (
      getResource(key, { page: currentPage, ...routeParams(key, todayISO()) }, false).then((response) => {
        if (response.data) {
          results.push(...response.data.results);
        }
        return results;
      })
    );

    promiseChain = promiseChain.then(makeNextPromise(page));
  }

  return promiseChain;
};

const getRemainingInitial = (prev, totalPages) => fetchMore('initial', 1, totalPages, prev);

const getInitial = () => {
  if (localStorage.MovieRoulette__initial) {
    return Promise.resolve(getFromStorage('initial'));
  }

  let totalPages = 1;
  return getResource('initial', {})
    .then((response) => {
      if (response.data) {
        console.log(localStorage);
        if (localStorage.MovieRoulette__initial) {
          const picks = getFromStorage('initial');
          if (response.data.total_results === picks.length) return picks;
        }
        totalPages = +response.data.total_pages;
        console.log(totalPages);
        return response.data.results;
      }

      if (localStorage.MovieRoulette__initial) {
        return getFromStorage('initial');
      }

      return [];
    })
    .then((prev) => {
      if (totalPages === 1) return prev;

      return getRemainingInitial(prev, totalPages);
    })
    .then((results) => {
      console.log('+++++++');
      console.log(results);
      setToStorage('initial', results);
      return results;
    });
};

const getByDiscover = (key) => {
  const storageKey = localStorageKey(key);

  if (localStorage[storageKey]) {
    return Promise.resolve(getFromStorage(key));
  }

  const params = routeParams(key, todayISO());

  return getResource(key, params)
    .then((response) => {
      if (response.data) {
        return response.data.results;
      }

      return [];
    })
    .then((prev) => fetchMore(key, 1, 10, prev))
    .then((results) => {
      console.log('+++++++');
      console.log(results);
      setToStorage(`${key}__last_page`, 10);
      setToStorage(key, results);
      return results;
    });
};

const getInitialSelection = (response, n) => {
  const arr = objectToArray(response);
  const filtered = arr.filter((m) => m.backdrop_path && !m.adult && +(m.vote_average) >= 7);
  const result = selectNFromArray(n, filtered);
  return result;
};

const getMovie = (key, prev) => {
  const bingos = getFromStorage('bingos');
  const arr = objectToArray(prev);
  const filtered = arr.filter((m) => !bingos.includes(m.id));
  let promiseChain = Promise.resolve(filtered);
  let movie = {};

  if (filtered.length < 1) {
    const firstPage = +getFromStorage(`${key}__last_page`);
    const lastPage = firstPage + 10;

    promiseChain = promiseChain.then(() => (
      fetchMore(key, firstPage, lastPage)
        .then((response) => {
          if (response.data) {
            setToStorage(`${key}__last_page`, lastPage);
            setToStorage(key, response.data);
            return objectToArray(response.data);
          }

          return [];
        })
    ));
  }

  promiseChain = promiseChain.then((result) => {
    movie = selectOneFromArray(result);
    if (movie) {
      const newBingos = [movie.id, ...bingos];
      setToStorage('bingos', newBingos);
    }
    return movie;
  });

  return promiseChain;
};

const imageURL = (path, size = 'w185') => `${routes('image_base')}/${size}/${path}`;

export default getInitial;

export {
  getInitial,
  getInitialSelection,
  getByDiscover,
  getMovie,
  imageURL,
};
