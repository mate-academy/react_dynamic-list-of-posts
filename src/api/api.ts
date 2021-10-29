export const BASE_URL = 'https://mate.academy/students-api';

interface Option {
  method: string,
  body?: string,
  headers?: { 'Content-type': string }
}

export const request = (url: string, option: Option = { method: 'GET' }) => {
  return fetch(`${BASE_URL}${url}`, option)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
