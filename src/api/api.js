const BASE_URL = 'https://mate-api.herokuapp.com/';

export const request = (url, options) => (
  fetch(`${BASE_URL}${url}`, options)
    .then(response => response.json())
    .then(res => res.data)
);
