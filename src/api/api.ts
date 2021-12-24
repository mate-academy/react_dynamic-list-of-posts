export const BASE_URL = 'https://mate.academy/students-api';

export const request = (endpoint: string, options = {}) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
