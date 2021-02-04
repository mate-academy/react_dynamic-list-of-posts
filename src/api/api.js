export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = url => fetch(`${BASE_URL}${url}`)
  .then(res => res.json()).then(result => result.data);
