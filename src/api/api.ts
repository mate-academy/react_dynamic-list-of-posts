const BASE_URL = 'https://mate.academy/students-api';

export const request = (title = '', options = {}) => {
  return fetch(`${BASE_URL}${title}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
