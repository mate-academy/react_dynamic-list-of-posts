export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(result => result.data);

export const post = (url, data) => fetch(`${BASE_URL}${url}`, {
  method: 'POST',
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then(result => result.data);

export const getUsers = () => request('/users');
