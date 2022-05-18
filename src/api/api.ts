export const BASE_URL = 'https://mate.academy/students-api';

export const request = (endPoint: string, option?: RequestInit) => {
  return fetch(`${BASE_URL}${endPoint}`, option)
    .then(response => {
      return response.ok
        ? response.json()
        : Promise.reject(new Error('error'));
    });
};
