const BASE_URL = 'https://mate-api.herokuapp.com/';

export function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error('Error: ', response.statusText));
      }

      return response.json();
    })
    .then(result => result.data);
}

export const remove = elementURL => request(elementURL, { method: 'DELETE' });

export const post = (url, data) => request(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(data),
});
