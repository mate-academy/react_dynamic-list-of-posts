export const BASE_URL = 'https://mate-api.herokuapp.com';

export const get = async(url, options) => fetch(`${BASE_URL}${url}`, options)
  .then(response => response.json())
  .then(result => result.data);

export function remove(url, id) {
  return fetch(`${BASE_URL}${url}/${id}`, {
    method: 'DELETE',
  });
}

export function post(url, data) {
  return get(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
}
