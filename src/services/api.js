import { getResource } from './axios';
import routes, { routeParams } from './routes';
import { selectNFromArray, objectToArray, todayISO } from './lib';

const getRemainingEditorsPicks = (prev, totalPages) => {
  let page = 1;
  let promiseChain = Promise.resolve();
  const results = [...prev];

  while (page < totalPages) {
    page += 1;

    if (page >= 500) {
      promiseChain.reject();
      break;
    }

    const makeNextPromise = (currentPage) => () => (
      getResource('initial', { page: currentPage }, false).then((response) => {
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

const getEditorsPicks = () => {
  // if (localStorage.MovieRoulette__editorsPicks) {
  //   return Promise.resolve((JSON.parse(localStorage.getItem('MovieRoulette__editorsPicks'))));
  // }

  let totalPages = 1;
  return getResource('initial', {}, false)
    .then((response) => {
      if (response.data) {
        console.log(localStorage);
        if (localStorage.MovieRoulette__editorsPicks) {
          const picks = JSON.parse(localStorage.getItem('MovieRoulette__editorsPicks'));
          if (response.data.total_results === picks.length) return picks;
        }
        totalPages = +response.data.total_pages;
        console.log(totalPages);
        return response.data.results;
      }

      if (localStorage.MovieRoulette__editorsPicks) {
        return JSON.parse(localStorage.getItem('MovieRoulette__editorsPicks'));
      }

      return [];
    })
    .then((prev) => {
      if (totalPages === 1) return prev;

      return getRemainingEditorsPicks(prev, totalPages);
    })
    .then((results) => {
      console.log('+++++++');
      console.log(results);
      localStorage.setItem('MovieRoulette__editorsPicks', JSON.stringify(results));
      return results;
    });
};

const getEditorsPicksSelection = (n) => (
  getEditorsPicks().then((response) => {
    const arr = objectToArray(response);
    const filtered = arr.filter((m) => m.backdrop_path && !m.adult && +(m.vote_average) >= 7);
    const result = selectNFromArray(n, filtered);
    return result;
  })
);

const getMovie = (key) => {
  return getResource(key, routeParams(key, todayISO()), false)
    .then((response) => {
      // catch errors
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

export default getEditorsPicks;

export { getEditorsPicks, getEditorsPicksSelection, getMovie, imageURL };
