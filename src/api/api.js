export const BASE_URL = 'https://mate-api.herokuapp.com';

// eslint-disable-next-line
export const getData = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}: ${response.statusText}`);
    })
    .then(response => response.data);
};

// eslint-disable-next-line
export const remove = (url) => {
  return fetch(`${BASE_URL}${url}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(result => result.data);
};

// eslint-disable-next-line
export const create = (url, data) => {
  return fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(result => result.data);
};
