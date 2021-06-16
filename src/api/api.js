export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, option = {}) => fetch(BASE_URL + url, option)
  .then(response => response.json())
  .then(result => result.data);

export const post = (url, data) => request(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});
