export const selectNFromArray = (n, arr) => {
  if (n > arr.length) return null;

  let nn = n;
  let x = 0;
  let len = arr.length;
  const taken = new Array(len);
  const result = new Array(n);
  while (nn--) {
    x = Math.floor(Math.random() * len);
    result[nn] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const selectOneFromArray = (arr) => {
  if (arr.length < 1) return null;

  return arr[Math.floor(Math.random() * arr.length)];
};

export const objectToArray = (obj) => {
  const arr = [];
  const json = obj;
  Object.keys(json).forEach((key) => {
    arr.push(json[key]);
  });
  return arr;
};

export const todayISO = () => {
  const d = new Date();
  let month = `${(d.getMonth() + 1)}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

export const yearFromDate = (date) => {
  const d = new Date(date);
  return d.getFullYear();
};

export const genreNameFromId = (genres, id) => {
  const genre = genres.filter((obj) => obj.id === id)[0];
  return genre.name || '';
};

export const localStorageKey = (key) => `MovieRoulette__${key}`;

export const getFromStorage = (key) => {
  const result = localStorage.getItem(localStorageKey(key));

  try {
    return JSON.parse(result);
  } catch (e) {
    localStorage.removeItem(localStorageKey(key));
    return null;
  }
};

export const setToStorage = (key, result) => localStorage.setItem(localStorageKey(key), JSON.stringify(result));

export const clearStorageByKeys = (keys) => {
  keys.forEach((key) => localStorage.removeItem(localStorageKey(key)));
};

export const updateStorage = () => {
  const dateString = getFromStorage('lastUpdated');
  const today = new Date().getTime();
  const date = dateString ? Date.parse(dateString) : null;

  if (date && today - date <= 6.048e+8) return false;

  // clear storage if there's no date recorded or date is older than 7 days ago
  localStorage.clear();
  setToStorage('lastUpdated', todayISO());
  return true;
};

export const nonEmpty = (parsed) => !!parsed && JSON.stringify(parsed) !== '[]' && JSON.stringify(parsed) !== '{}';

export default selectNFromArray;
