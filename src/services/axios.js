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

const error = () => message.error("Appy-polly-loggies! There's been an error.");

const axiosRequest = async (method, key, params = {}, showLoading = true) => {
  let showError = true;
  const url = routes(key);
  const authParams = {
    api_key: process.env.REACT_APP_API_KEY,
    ...params,
  };

  if (showLoading) loading();

  try {
    const response = await axios[method](url, { params: authParams });
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      return {
        data: response.data,
        error: null,
      };
    }

    showError = true;
    return {
      data: null,
      error: response,
    };
  } catch (e) {
    showError = true;
    if (e.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(e.response.error);
      console.log(e.response.data);
      console.log(e.response.status);
      console.log(e.response.headers);
      return {
        data: null,
        error: e.response,
      };
    }
    if (e.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return {
        data: null,
        error: e.request,
      };
    }
    // Something happened in setting up the request that triggered an Error
    return {
      data: null,
      error: e.message,
    };
  } finally {
    if (showError) {
      error();
    } else {
      stopLoading();
    }
  }
};

const getResource = (key, params = {}, showLoading = true) => axiosRequest('get', key, params, showLoading);

export default getResource;

export { getResource, axiosRequest };
