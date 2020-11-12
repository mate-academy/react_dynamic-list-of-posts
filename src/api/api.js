const BASE_URL = 'https://mate-api.herokuapp.com';

export const getData = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(result => result.data);

export const post = (url, data) => (
  getData(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  }));

export const remove = url => (
  getData(url, { method: 'DELETE' })
);
