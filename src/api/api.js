export const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then(res => res.json())
  .then(result => result.data);

export const remove = url => request(url, { method: 'DELETE' });

export const post = (url, data) => request(url, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});
