export const request = (url, options) => {
  const BASE_URL = 'https://mate-api.herokuapp.com';

  return fetch(`${BASE_URL}${url}`, options)
    .then(response => response.json())
    .then(response => response.data);
};
