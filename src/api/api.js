export const BASE_URL = 'https://mate-api.herokuapp.com';

export const get = (point, options) => (
  fetch(`${BASE_URL}/${point}`, options)
    .then(response => response.json())
    .then(result => result.data)
)

export const remove = (point) => (
  get(point, { method: 'DELETE' })
)

export const post = (point, data) => (
  get(point, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
)