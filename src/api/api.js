const BASE_URL = 'https://mate-api.herokuapp.com/';

export const request = (url, option) => (
  fetch(`${BASE_URL}${url}`, option)
    .then(response => response.json())
    .then(res => res.data)
);
