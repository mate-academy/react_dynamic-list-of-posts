export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, method = {}) => fetch(BASE_URL + url, method)
  .then(response => response.json())
  .then(res => res.data);

export const post = (url, body) => request(url, {
  method: 'POST',
  body: JSON.stringify(body),
});
