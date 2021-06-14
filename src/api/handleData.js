import { BASE_URL } from './api';

export function getData(endPoint, id = '', options) {
  return fetch(`${BASE_URL}${endPoint}${id}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
}

export const remove = (endPoint, id = '') => getData(
  endPoint, id, { method: 'DELETE' },
);

export const post = (url, id = '', body) => getData(url, id, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(body),
});
