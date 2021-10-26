const BASE_URL = 'https://mate.academy/students-api';

export const request = (endpoint = '', options = {}) => (
  fetch(`${BASE_URL}${endpoint}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
);

export const post = (url: string, data: Comment) => (
  request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
);

export const remove = (url: string) => (
  request(url, {
    method: 'DELETE',
  })
);
