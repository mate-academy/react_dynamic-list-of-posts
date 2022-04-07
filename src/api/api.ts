export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, init = {}) => fetch(`${BASE_URL}${url}`, init)
  .then(response => response.json());

export const remove = (url: string) => request(url, { method: 'DELETE' });
