export const baseUrl = 'https://mate-api.herokuapp.com';

export const request = (url, option = {}) => fetch(baseUrl + url, option)
  .then(response => response.json())
  .then(result => result.data);

export const post = (url, body) => request(url, {
  method: 'POST',
  body: JSON.stringify(body),
});
