export const BASE_URL = 'https://mate-api.herokuapp.com';

export function request(url) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json())
    .then(result => result.data);
}

export function remove(url, id) {
  return fetch(`${BASE_URL}${url}/${id}`, {
    method: 'DELETE',
  });
}

export function post(url, body) {
  return fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  });
}
