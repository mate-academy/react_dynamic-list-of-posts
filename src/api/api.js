export const BASE_URL = 'https://mate-api.herokuapp.com';

export function request(url, options) {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    })
    .then(result => result.data);
}
