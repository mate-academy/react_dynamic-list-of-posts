export const BASE_URL = 'https://mate-api.herokuapp.com';

export function request(url) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json())
    .then(result => result.data);
}

export function getUsers() {
  return request('/users');
}

export const post = (url, body) => fetch(`${BASE_URL}${url}`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(body),
});

export const remove = url => fetch(`${BASE_URL}${url}`, { method: 'DELETE' });
