export const BASE_URL = 'https://mate-api.herokuapp.com';

export function request(requiredData) {
  return fetch(`${BASE_URL}${requiredData}`)
    .then(response => response.json())
    .then(result => result.data);
}
