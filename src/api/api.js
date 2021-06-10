export const BASE_URL = 'https://mate-api.herokuapp.com';

export function getData(url) {
  return fetch(BASE_URL + url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json()
        .then(result => result.data);
    });
}

export const post = (url, data) => fetch(BASE_URL + url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(respone => respone.json())
  .then(result => result.data);

export const remove = url => fetch(BASE_URL + url, { method: 'DELETE' });
