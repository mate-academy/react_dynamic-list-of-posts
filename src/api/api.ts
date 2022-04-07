export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string) => fetch(`${BASE_URL}${url}`)
  .then(response => response.json());
