import { message } from 'antd';
import routes from './routes';

const axios = require('axios');

axios.defaults.validateStatus = null;

// axios.defaults.withCredentials = true;

// axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`;

axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.defaults.headers.common['Accept'] = 'application/json';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const loading = () => message.loading('Requesting data...', 0);

const stopLoading = () => message.destroy();

const axiosRequest = async (method, key, params = {}) => {
  const url = routes(key);
  const paramsValue = {
    api_key: process.env.REACT_APP_API_KEY,
    ...params,
  };

  loading();

  try {
    const response = await axios[method](url, { params: paramsValue });
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      return {
        data: response.data,
        error: null,
      };
    }
    return {
      data: null,
      error: response,
    };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.error);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return {
        data: null,
        error: error.response,
      };
    }
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return {
        data: null,
        error: error.request,
      };
    }
    // Something happened in setting up the request that triggered an Error
    return {
      data: null,
      error: error.message,
    };
  } finally {
    stopLoading();
  }
};

const getResource = (key, params = {}) => axiosRequest('get', key, params);

const fetchAllPicks = (prev, totalPages) => {
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
      getResource('initial', { page: currentPage }).then((response) => {
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
  if (localStorage.editorsPicks) {
    console.log("local found")
    return Promise.resolve(() => JSON.parse(localStorage.getItem('editorsPicks')));
  }

  let totalPages = 1;
  return getResource('initial').then((response) => {
    if (response.data) {
      totalPages = +response.data.total_pages;
      return response.data.results;
    }

    return Promise.reject();
  }).then((prev) => {
    if (totalPages === 1) return prev;

    return fetchAllPicks(prev, totalPages);
  }).then((results) => {
    console.log(results)
    localStorage.setItem('editorsPicks', JSON.stringify(results));
    return results;
  });
};


const imageURL = (path, size = 'w185') => `${routes('image_base')}/${size}/${path}`;

export default axiosRequest;

export { getResource, getEditorsPicks, imageURL };
