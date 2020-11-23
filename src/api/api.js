export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (all, id = '', options) => fetch(
  `${BASE_URL}/${all}/${id}`, options,
)
  .then(response => response.json())
  .then(result => result.data);
