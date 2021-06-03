export const baseUrl = 'https://mate-api.herokuapp.com';

export const request = (url, option = {}) => fetch(baseUrl + url, option)
  .then(response => response.json())
  .then(data => data.data);
