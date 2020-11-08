export const BASE_URL = 'https://mate-api.herokuapp.com';

export const fetchData = url => fetch(url)
  .then(response => response.json())
  .then(result => result);
