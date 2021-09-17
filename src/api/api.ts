const BASE_URL = 'https://mate.academy/students-api';

export const basicRequest = (url: string, option = {}) => {
  return fetch(`${BASE_URL}${url}`, option)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
