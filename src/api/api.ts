export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, init = {}) => fetch(BASE_URL + url, init)
  .then((res) => res.json());

export const create = <Data>(url: string, data: Data) => request(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const remove = (url: string) => request(url, {
  method: 'DELETE',
});
