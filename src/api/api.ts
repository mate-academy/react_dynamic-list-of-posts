export const BASE_URL = 'https://mate.academy/students-api';

type Option = {
  method: string
  headers?: {}
  body?: string
};

export const request = (endpoint: string, id: number | string = '', option: Option = { method: 'GET' }) => {
  return fetch(`${BASE_URL}${endpoint}${id}`, option)
    .then(response => {
      if (!response.ok) {
        return new Error(`${BASE_URL}${endpoint} ERROR 404`);
      }

      return response.json();
    })
    .catch(() => {});
};
