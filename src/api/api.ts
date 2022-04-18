export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, option?: RequestInit) => {
  return fetch(`${BASE_URL}/${url}`, option)
    .then(res => res.json())
    .then(res => {
      if (res.Error) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res;
    });
};
