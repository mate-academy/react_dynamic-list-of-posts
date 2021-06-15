const BASE_URL = 'https://mate-api.herokuapp.com';

export const getData = url => fetch(`${BASE_URL}/${url}`)
  .then(response => response.json())
  .then(result => result.data);
