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

export const objectToArray = (obj) => {
  const arr = [];
  const json = obj;
  Object.keys(json).forEach((key) => {
    arr.push(json[key]);
  });
  return arr;
};

export default selectNFromArray;
