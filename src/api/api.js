export const BASE_URL = 'https://mate-api.herokuapp.com';

export function request(enpoint, options) {
  return fetch(`${BASE_URL}${enpoint}`, options)
    .then(response => response.json())
    .then(result => result.data);
}
