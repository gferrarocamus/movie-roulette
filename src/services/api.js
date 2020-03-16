import { getResource } from './axios';
import { routeParams, imageConfig } from './routes';
import {
  getFromStorage,
  getListFromStorage,
  nonEmpty,
  objectToArray,
  selectNFromArray,
  selectOneFromArray,
  setToStorage,
  todayISO,
} from './lib';

const fetchMore = (key, previousPage, lastPage, prev = [], query = null) => {
  let page = previousPage;
  let promiseChain = Promise.resolve();
  const results = [...prev];
  const max = key === 'trending' ? 1000 : 500; // as per TMDB's API definition
  const params = query || routeParams(key, todayISO());

  while (page < lastPage) {
    page += 1;

    if (page >= max) {
      // promiseChain = Promise.reject();
      break;
    }

    const makeNextPromise = (currentPage) => () => (
      getResource(key, { page: currentPage, ...params }, false).then((response) => {
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
  const storage = getFromStorage('initial');
  // TODO: consider whether to remove
  if (nonEmpty(storage)) {
    return Promise.resolve(storage);
  }

  let fresh = true;
  let totalPages = 1;
  return getResource('initial', {})
    .then((response) => {
      if (response.data) {
        totalPages = +response.data.total_pages;
        if (nonEmpty(storage) && response.data.total_results === storage.length) {
          return storage;
        }

        fresh = false;
        return response.data.results;
      }

      return storage || [];
    })
    .then((prev) => {
      if (fresh) return prev;

      return getRemainingInitial(prev, totalPages);
    })
    .then((results) => {
      console.log('+++++++', results);
      if (nonEmpty(results)) {
        setToStorage('initial__lastPage', totalPages);
        setToStorage('initial', results);
        return results;
      }

      return [];
    });
};

const getByDiscover = (key, query = null) => {
  const storage = getFromStorage(key);
  // TODO: consider whether to remove
  if (nonEmpty(storage)) {
    return Promise.resolve(storage);
  }

  const params = query || routeParams(key, todayISO());

  return getResource(key, params)
    .then((response) => {
      if (response.data) {
        return response.data.results;
      }

      return [];
    })
    .then((prev) => fetchMore(key, 1, 10, prev))
    .then((results) => {
      console.log('+++++++', results);
      if (nonEmpty(results)) {
        setToStorage(`${key}__lastPage`, 10);
        setToStorage(key, results);
        return results;
      }

      return [];
    });
};

const getInitialSelection = (response, n) => {
  const arr = objectToArray(response);
  const filtered = arr.filter((m) => m.backdrop_path && !m.adult && +(m.vote_average) >= 7);
  const result = selectNFromArray(n, filtered);
  return result;
};

const getMovie = (key, prev) => {
  const bingos = getListFromStorage('bingos');
  const arr = objectToArray(prev);
  const filtered = arr.filter((m) => !bingos.includes(m.id));
  let promiseChain = Promise.resolve(filtered);
  let movie = {};

  if (filtered.length < 1) {
    const firstPage = +getFromStorage(`${key}__lastPage`) + 1;
    const lastPage = firstPage + 10;

    promiseChain = promiseChain.then(() => (
      fetchMore(key, firstPage, lastPage)
        .then((response) => {
          if (nonEmpty(response)) {
            setToStorage(`${key}__lastPage`, lastPage);
            setToStorage(key, response);
            return response;
          }

          return [];
        })
    ));
  }

  promiseChain = promiseChain.then((result) => {
    movie = selectOneFromArray(result);
    return movie;
  });

  return promiseChain;
};

const addToBingos = (movie) => {
  const bingos = getListFromStorage('bingos');

  if (movie && movie.id && !bingos.includes(movie.id)) {
    const newBingos = [movie.id, ...bingos];
    setToStorage('bingos', newBingos);
  }
};

const removeFromBingos = (id) => {
  const bingos = getListFromStorage('bingos');

  if (id) {
    const newBingos = bingos.filter((bingoId) => bingoId !== id);
    setToStorage('bingos', newBingos);
  }
};

const addToList = (movie, key) => {
  const list = getListFromStorage(key);

  if (movie && movie.id) {
    const newList = [movie, ...list].filter((item, i, arr) => (
      i === arr.findIndex((obj) => (
        item.id === obj.id
      ))
    ));
    setToStorage(key, newList);
  }
};

const imageURL = (path, size = 'w185') => `${imageConfig.secure_base_url}${size}${path}`;

const imageSrcSet = (path, set) => (
  set.map((width) => `${imageURL(path, `w${width}`)} ${width}w`).join(', ')
);

export default getInitial;

export {
  addToBingos,
  addToList,
  getByDiscover,
  getInitial,
  getInitialSelection,
  getMovie,
  imageSrcSet,
  imageURL,
  removeFromBingos,
};
