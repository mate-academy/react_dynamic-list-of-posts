export const BASE_URL = 'https://mate.academy/students-api';

export const request = (endpoint: string, option?:RequestInit) => {
  return fetch(`${BASE_URL}${endpoint}`, option)
    .then(response => response.json())
    .then(response => {
      if (response.Error) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response;
    });
};
