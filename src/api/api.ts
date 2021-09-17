const BASE_URL = 'https://mate.academy/students-api';

export const requeste = (url: string, options = {}) => (
  fetch(`${BASE_URL}${url}`, options)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(new Error('Some error message')))));
