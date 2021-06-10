export const BASE_URL = 'https://mate-api.herokuapp.com';

export const getData = url => (fetch(`${BASE_URL}${url}`).then((response) => {
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json()
    .then(result => result.data);
}));

export const remove = url => (fetch(`${BASE_URL}${url}`, { method: 'DELETE' })
  .then(response => response.json())
  .then(result => result.data)
);

export const create = (url, data) => (fetch(`${BASE_URL}${url}`, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})
  .then(response => response.json())
  .then(result => result.data)
);
