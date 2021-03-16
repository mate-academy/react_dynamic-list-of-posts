export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(url, options)
  .then(result => result.json());
