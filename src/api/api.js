export const BASE_URL = 'https://mate-api.herokuapp.com';

export function request(url, options) {
  fetch(`${BASE_URL}${url}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
}
