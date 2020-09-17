export const BASE_URL = 'https://mate-api.herokuapp.com';

export const getPosts = () => fetch(`${BASE_URL}/posts`)
  .then(response => response.json())
  .then(result => result.data);
