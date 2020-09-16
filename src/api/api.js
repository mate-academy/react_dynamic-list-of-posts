export const BASE_URL = 'https://mate-api.herokuapp.com';

export function request(path) {
  return fetch(`${BASE_URL}${path}`)
    .then(response => response.json())
    .then(result => result.data);
}
