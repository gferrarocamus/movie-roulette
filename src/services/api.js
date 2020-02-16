import { getResource } from './axios';
import routes, { routeParams } from './routes';
import { selectNFromArray, objectToArray, todayISO, localStorageKey, getFromStorage, setToStorage } from './lib';

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
  return getResource('initial', {}, false)
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

const getInitialSelection = (n) => (
  getInitial().then((response) => {
    const arr = objectToArray(response);
    const filtered = arr.filter((m) => m.backdrop_path && !m.adult && +(m.vote_average) >= 7);
    const result = selectNFromArray(n, filtered);
    return result;
  })
);

const getByDiscover = (key) => {
  const params = routeParams(key, todayISO());
  const k = localStorageKey(key);
  let totalPages = 1;

  return getResource(key, params, false)
    .then((response) => {
      if (response.data) {
        if (localStorage[k]) {
          const picks = getFromStorage(key);
          if (response.data.total_results === picks.length) return picks;
        }
        totalPages = +response.data.total_pages;
        console.log(totalPages);
        return response.data.results;
      }

      if (localStorage[k]) {
        return getFromStorage(key);
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
      setToStorage(key, results);
      return results;
    });
};

const getMovie = (key) => {
  return getResource(key, routeParams(key, todayISO()), false)
    .then((response) => {
      // record page number
      // random pick
      // record selection
      if (response.data) {
        return response.data;
      }

      return {};
    });
};

const imageURL = (path, size = 'w185') => `${routes('image_base')}/${size}/${path}`;

export default getInitial;

export { getInitial, getInitialSelection, getByDiscover, getMovie, imageURL };
