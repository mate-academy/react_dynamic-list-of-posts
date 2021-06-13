const BASE_URL = 'https://mate-api.herokuapp.com';

export function get(url) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json())
    .then(result => result.data);
}

export function remove(url) {
  return fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
  });
}

export function post(url, data) {
  return fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
}
