export const BASE_URL = 'https://mate.academy/students-api';

export const request = (
  endpoint: string, options?: RequestInit,
) => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(data => data.json());
};
