export const BASE_URL = 'https://mate-api.herokuapp.com';

export const get = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(result => result.data);

export const remove = url => fetch(`${BASE_URL}${url}`, { method: 'DELETE' })
  .then(response => response.json())
  .then(result => result.data);

export const post = (url, data) => fetch(`${BASE_URL}${url}`, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(response => response.json())
  .then(result => result.data);
