export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (endpoint, options) => (
  fetch(BASE_URL + endpoint, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    }).then(result => result.data));

export const remove = (endpoint) => {
  const method = { method: 'DELETE' };

  return request(endpoint, method);
};
