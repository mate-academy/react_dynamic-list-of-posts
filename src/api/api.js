export const BASE_URL = 'https://mate-api.herokuapp.com';

export const get = (endpoint, options) => (
  fetch(`${BASE_URL}/${endpoint}`, options)
    .then(response => response.json())
    .then(result => result.data)
)

export const remove = (endpoint) => (
  get(endpoint, { method: 'DELETE' })
)

export const post = (endpoint, data) => (
  get(endpoint, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
)