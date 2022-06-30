export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url:string, config: RequestInit = {}) => {
  return fetch(`${BASE_URL}${url}`, config)
    .then(response => response.json());
};
